from flask import Flask, request, jsonify
from flask_cors import CORS
from m3docrag import M3DOCRAG
import tempfile
import os
import logging

app = Flask(__name__)
CORS(app)

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

# Initialize M3DOCRAG
rag = M3DOCRAG(use_flash_attention=False)

@app.route('/api/homework/correct', methods=['POST'])
def correct_homework():
    try:
        if 'file' not in request.files:
            return jsonify({'error': 'No file provided'}), 400
            
        file = request.files['file']
        question = request.form.get('question', '')
        homework_id = request.form.get('homeworkId', '')
        
        if not file.filename or not file.filename.endswith('.pdf'):
            return jsonify({'error': 'Invalid file type. Only PDF files are accepted'}), 400
            
        # Save uploaded file temporarily
        with tempfile.NamedTemporaryFile(delete=False, suffix='.pdf') as tmp:
            try:
                file.save(tmp.name)
                logger.info(f'Processing homework {homework_id}')
                
                # Process with M3DOCRAG
                rag.add_document(tmp.name, homework_id)
                rag.build_index()
                answer = rag.process_query(question)
                
                return jsonify({
                    'correction': answer,
                    'status': 'success'
                })
            except Exception as e:
                logger.error(f'Error processing file: {str(e)}')
                raise
            finally:
                # Cleanup
                try:
                    os.unlink(tmp.name)
                except Exception as e:
                    logger.error(f'Error deleting temporary file: {str(e)}')
        
    except Exception as e:
        logger.error(f'Error in correction endpoint: {str(e)}')
        return jsonify({
            'error': 'Une erreur est survenue lors de la correction',
            'details': str(e)
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=5000)