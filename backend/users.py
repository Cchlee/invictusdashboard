
# Let's get this party started!
import falcon

import json

import jwt

from db_login import *


# Falcon follows the REST architectural style, meaning (among
# other things) that you think in terms of resources and state
# transitions, which map to HTTP verbs.
class UsersResource(object):
    
    def on_get(self, req, resp):
        """Handles GET requests"""
        # Return note for particular ID
        if req.get_param("users"):
            result = {'users': r.db(PROJECT_DB).table(PROJECT_TABLE). get(req.get_param("users")).run(db_connection)}
        else:
            note_cursor = r.db(PROJECT_DB).table(PROJECT_TABLE).run(db_connection)
            result = {'users': [i for i in note_cursor]}
        resp.body = json.dumps(result)

    def on_post(self, req, resp):
         """Handles POST requests"""
        #  try:
        #      print(type(json.loads(req.stream.read())))
        #      raw_json = json.loads(req.stream.read()
        # #  except Exception as ex:
        # #      raise falcon.HTTPError(falcon.HTTP_400,'Error',ex.message)
         try:
             result = json.loads(req.stream.read())
             print(encode)
             sid =  r.db(PROJECT_DB).table(PROJECT_TABLE).insert({'username':username,'password':result['password']}).run(db_connection)
             resp.body = 'Successfully inserted %s'%sid
         except ValueError:
             raise falcon.HTTPError(falcon.HTTP_400,'Invalid JSON','Could not decode the request body. The ''JSON was incorrect.')


class LoginResource(object):

    def on_get(self, req, resp):
        """Handles GET requests"""
        try:
            result=req.get_param('token')
            payload = jwt.decode(result, 'invictus', algorithms=['HS256'])
            print(payload)
            resp.body = json.dumps(payload)
        except ValueError:
             raise falcon.HTTPError(falcon.HTTP_400,'Invalid JSON','Could not decode the request body. The ''JSON was incorrect.')
            

    def on_post(self, req, resp):
         """Handles POST requests"""
         try:
            result = json.loads(req.stream.read())
            username = result['username']  
            password = result['password']
            print(username)
            if r.db(PROJECT_DB).table(PROJECT_TABLE).filter({'username': username}).filter({'password': password}).count().eq(1).run(db_connection):
                encode = jwt.encode({'username': result['username']}, 'invictus', algorithm='HS256')
                print("it matches")
                resp.body = json.dumps(encode)
            else:
                print("it doesn't match")
                resp.body = json.dumps("failure")
         except ValueError:
             raise falcon.HTTPError(falcon.HTTP_400,'Invalid JSON','Could not decode the request body. The ''JSON was incorrect.')


class TokensResource(object):
    
    def on_get(self, req, resp):
        """Handles GET requests"""
        # Return note for particular ID
        if req.get_param("id"):
            result = {'tokens': r.db(PROJECT_DB).table(PROJECT_TABLE). get(req.get_param("id")).run(db_connection)}
        else:
            note_cursor = r.db(PROJECT_DB).table(PROJECT_TABLE).run(db_connection)
            result = {'tokens': [i for i in note_cursor]}
        resp.body = json.dumps(result)

    def on_post(self, req, resp):
         """Handles POST requests"""
        #  try:
        #      print(type(json.loads(req.stream.read())))
        #      raw_json = json.loads(req.stream.read()
        # #  except Exception as ex:
        # #      raise falcon.HTTPError(falcon.HTTP_400,'Error',ex.message)
         try:
             result = json.loads(req.stream.read())
             sid =  r.db(PROJECT_DB).table(PROJECT_TABLE).insert({'token':result['token'],'address':result['address'], 'balance':result['balance']}).run(db_connection)
             resp.body = 'Successfully inserted %s'%sid
         except ValueError:
             raise falcon.HTTPError(falcon.HTTP_500,'Invalid JSON','Could not decode the request body. The ''JSON was incorrect.')

class BalanceResource(object):
    
    def on_get(self, req, resp):
        """Handles GET requests"""
        # Return note for particular ID
        if req.get_param("id"):
            result = {'tokens': r.db(PROJECT_DB).table(PROJECT_TABLE). get(req.get_param("id")).run(db_connection)}
        else:
            note_cursor = r.db(PROJECT_DB).table(PROJECT_TABLE).run(db_connection)
            result = {'tokens': [i for i in note_cursor]}
        resp.body = json.dumps(result)

    def on_post(self, req, resp):
         """Handles POST requests"""
        #  try:
        #      print(type(json.loads(req.stream.read())))
        #      raw_json = json.loads(req.stream.read()
        # #  except Exception as ex:
        # #      raise falcon.HTTPError(falcon.HTTP_400,'Error',ex.message)
         try:
             result = json.loads(req.stream.read())
             sid =  r.db(PROJECT_DB).table(PROJECT_TABLE).filter({'address':result['address']}).update({'balance':result['balance']}).run(db_connection)
             print(sid)
             resp.body = 'Successfully inserted %s'%sid
         except ValueError:
             raise falcon.HTTPError(falcon.HTTP_500,'Invalid JSON','Could not decode the request body. The ''JSON was incorrect.')

class AddressResource(object):
    
    def on_get(self, req, resp):
        """Handles GET requests"""
        # Return note for particular ID
        if req.get_param("id"):
            result = {'tokens': r.db(PROJECT_DB).table(PROJECT_TABLE). get(req.get_param("id")).run(db_connection)}
        else:
            note_cursor = r.db(PROJECT_DB).table(PROJECT_TABLE).run(db_connection)
            result = {'tokens': [i for i in note_cursor]}
        resp.body = json.dumps(result)

    def on_post(self, req, resp):
         """Handles POST requests"""
        #  try:
        #      print(type(json.loads(req.stream.read())))
        #      raw_json = json.loads(req.stream.read()
        # #  except Exception as ex:
        # #      raise falcon.HTTPError(falcon.HTTP_400,'Error',ex.message)
         try:
             result = json.loads(req.stream.read())
             sid =  r.db(PROJECT_DB).table(PROJECT_TABLE).filter({'token':result['token']}).pluck('address', 'balance').run(db_connection)
             result = {'data': [i for i in sid]}
             resp.body = json.dumps(result)
         except ValueError:
             raise falcon.HTTPError(falcon.HTTP_500,'Invalid JSON','Could not decode the request body. The ''JSON was incorrect.')

class C20Resource(object):

    def on_get(self, req, resp):
        """Handles GET requests"""
        # Return note for particular ID
        if req.get_param("BALANCES"):
            result = {'tokens': r.db(PROJECT_DB).table(PROJECT_TABLE). get(req.get_param("BALANCES")).run(db_connection)}
        else:
            note_cursor = r.db(PROJECT_DB).table(PROJECT_TABLE).run(db_connection)
            result = {'tokens': [i for i in note_cursor]}
        resp.body = json.dumps(result)

    def on_post(self, req, resp):
         """Handles POST requests"""
        #  try:
        #      print(type(json.loads(req.stream.read())))
        #      raw_json = json.loads(req.stream.read()
        # #  except Exception as ex:
        # #      raise falcon.HTTPError(falcon.HTTP_400,'Error',ex.message)
         try:
             result = json.loads(req.stream.read())
             sid =  r.db(PROJECT_DB).table(PROJECT_TABLE).filter({'BALANCES':result['BALANCES']}).update({
                 'BTC':result['BTC'],
                 'ETH':result['ETH'], 
                 'XRP':result['XRP'],
                 'BCH':result['BCH'],
                 'EOS':result['EOS'],
                 'XLM':result['XLM'],
                 'LTC':result['LTC'],
                 'ADA':result['ADA'],
                 'USDT':result['USDT'],
                 'XMR':result['XMR'],
                 'ETC':result['ETC'],
                 'TRX':result['TRX'],
                 'MIOTA':result['MIOTA'],
                 'DASH':result['DASH'],                 
                 'NEO':result['NEO'],
                 'XEM':result['XEM'],
                 'BNB':result['BNB'],
                 'XTZ':result['XTZ'],
                 'ZEC':result['ZEC'],
                 'VET':result['VET'],
                 }).run(db_connection)
            #  sid = r.db(PROJECT_DB).table(PROJECT_TABLE).get("dfe7573d-e56a-40bd-aacc-1ba98ff95e65").delete().run(db_connection)
             result = {'data': [i for i in sid]}
             resp.body = json.dumps(result)
         except ValueError:
             raise falcon.HTTPError(falcon.HTTP_500,'Invalid JSON','Could not decode the request body. The ''JSON was incorrect.')

class Loadc20Resource(object):

    def on_get(self, req, resp):
        """Handles GET requests"""
        # Return note for particular ID
        if req.get_param("BALANCES"):
            result = {'tokens': r.db(PROJECT_DB).table(PROJECT_TABLE). get(req.get_param("BALANCES")).run(db_connection)}
        else:
            note_cursor = r.db(PROJECT_DB).table(PROJECT_TABLE).run(db_connection)
            result = {'tokens': [i for i in note_cursor]}
        resp.body = json.dumps(result)

    def on_post(self, req, resp):
        """Handles POST requests"""
        #  try:
        #      print(type(json.loads(req.stream.read())))
        #      raw_json = json.loads(req.stream.read()
        # #  except Exception as ex:
        # #      raise falcon.HTTPError(falcon.HTTP_400,'Error',ex.message)
        try:
            result = json.loads(req.stream.read())
            # sid =  r.db(PROJECT_DB).table(PROJECT_TABLE).filter({'BALANCES':result['BALANCES']}).run(db_connection)
            # sid = r.db(PROJECT_DB).table(PROJECT_TABLE).get("dfe7573d-e56a-40bd-aacc-1ba98ff95e65").delete().run(db_connection)
            sid = r.db(PROJECT_DB).table(PROJECT_TABLE).get("f2e3a922-9eb3-4b2b-a99f-1b5e6d75a8b4").run(db_connection)
            result = {'data': [i for i in sid]}
            print(sid)
            resp.body = json.dumps(sid)
        except ValueError:
            raise falcon.HTTPError(falcon.HTTP_500,'Invalid JSON','Could not decode the request body. The ''JSON was incorrect.')
    

# falcon.API instances are callable WSGI apps
app = falcon.API()

# Resources are represented by long-lived class instances
users = UsersResource()
login = LoginResource()
token = TokensResource()
balance = BalanceResource()
address = AddressResource()
c20 = C20Resource()
loadc20 = Loadc20Resource()

# things will handle all requests to the '/things' URL path
app.add_route('/users', users)
app.add_route('/login', login)
app.add_route('/token', token)
app.add_route('/balance', balance)
app.add_route('/address', address)
app.add_route('/c20', c20)
app.add_route('/loadc20', loadc20)