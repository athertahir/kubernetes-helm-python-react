import json
from flask import Flask, Response, request, abort, session
from .utils import JSON_MIME_TYPE, json_response, get_conversation_history
from .utils import search_question, get_questions, get_next_question

app = Flask(__name__)


@app.route('/')
def hello():
    return 'Welcome to Flask Application HomePage!'


@app.route('/question', methods=['GET'])
def question_list():
    response = Response(
        json.dumps(get_questions()), status=200, mimetype=JSON_MIME_TYPE)
    return response


@app.route('/question/<string:question_id>')
def question_detail(question_id):
    session.clear()
    question = search_question(question_id)
    if question is None:
        abort(404)

    content = json.dumps(question)
    return content, 200, {'Content-Type': JSON_MIME_TYPE}


@app.route('/question', methods=['POST'])
def answer_post():
    if request.content_type != JSON_MIME_TYPE:
        error = json.dumps({'error': 'Invalid Content Type. Expected JSON'})
        return json_response(error, 400)

    data = request.json
    if not all([data.get('id'), data.get('answer')]):
        error = json.dumps({'error': 'Missing field(s) (id, answer)'})
        return json_response(error, 400)

    question = search_question(str(data['id']))
    if question is None:
        error = json.dumps({'error': 'Invalid ID'})
        return json_response(error, 400)

    params = {
        'id': data['id'],
        'answer': data['answer']
    }
    # reading and updating session data
    conversation = ' ' + question['response'] + ' => ' + data['answer']
    if 'history' in session:
        session['history'] = session.get('history') + conversation
    else:
        session['history'] = conversation  # setting session data
    print(params)
    print(session['history'])

    question = get_next_question(str(data['id']), data['answer'])
    if (question['type'] == 'acknowledgement'):
        question['conversationHistory'] = get_conversation_history(session)
        # data = {"type": "end", "response": get_conversation_history(session)}
        session.pop('history')  # clear history from session
        print("Conversation Ended")
        # content = json.dumps(data)
        # return content, 200, {'Content-Type': JSON_MIME_TYPE}

    content = json.dumps(question)
    return content, 200, {'Content-Type': JSON_MIME_TYPE}


@app.errorhandler(404)
def not_found(e):
    return '', 404
