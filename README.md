# mydoc
mydoc (https://mydoctask.herokuapp.com/)

Get Api - 
https://mydoctask.herokuapp.com/object/:key - For certain key value will fetch the value from db
https://mydoctask.herokuapp.com/object/:key?timestamp=time - Will fetch value of key at certain timeperiod if exists or value before the timeperiod if value at given timestamp does not exist

Post Api -
https://mydoctask.herokuapp.com/object/ - Will accept request body : {key: 'somekey', value: 'somevalue'} and store the same in db at given time
