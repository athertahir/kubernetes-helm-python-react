from flask import make_response
import json
JSON_MIME_TYPE = 'application/json'

# read file
with open('questions.json', 'r') as myfile:
    data = myfile.read()
# parse file
obj = json.loads(data)


def get_questions():
    return obj


def search_question(id):
    # output_dict = [x for x in obj['data'] if x['id'] == id ]
    question = obj['data'][id]
    if question is not None:
            question['id'] = id
            return question
    return None


def get_next_question(id, answer):
    question = obj['data'][id]
    if (question['type'] == 'acknowledgement'):
        return None
    new_question_key = obj['data'][id]['answers'][answer]
    print('*****************************')
    print(new_question_key)
    new_question = search_question(new_question_key)
    if new_question is not None:
            return new_question


def get_conversation_history(session):
    if 'history' in session:
        return session.get('history')
    else:
        return "Failed to read conversation history from session."


def json_response(data='', status=200, headers=None):
    headers = headers or {}
    if 'Content-Type' not in headers:
        headers['Content-Type'] = JSON_MIME_TYPE

    return make_response(data, status, headers)
