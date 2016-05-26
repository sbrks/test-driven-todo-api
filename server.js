// require express and other modules
var express = require('express'),
    app = express(),
    bodyParser = require('body-parser');

// configure bodyParser (for receiving form data)
app.use(bodyParser.urlencoded({ extended: true }));

// serve static files from public folder
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

// our database is an array for now with some hardcoded values
var todos = [
  { _id: 1, task: 'Laundry', description: 'Wash clothes' },
  { _id: 2, task: 'Grocery Shopping', description: 'Buy dinner for this week' },
  { _id: 3, task: 'Homework', description: 'Make this app super awesome!' }
];

/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */

app.get('/', function homepage(req, res) {
  res.sendFile(__dirname + '/views/index.html');
});


/*
 * JSON API Endpoints
 *
 * The comments below give you an idea of the expected functionality
 * that you need to build. These are basic descriptions, for more
 * specifications, see the todosTest.js file and the outputs of running
 * the tests to see the exact details. BUILD THE FUNCTIONALITY IN THE
 * ORDER THAT THE TESTS DICTATE.
 */

app.get('/api/todos/search', function search(req, res) {
  /* This endpoint responds with the search results from the
   * query in the request. COMPLETE THIS ENDPOINT LAST.
   */
});

app.get('/api/todos', function index(req, res) {
  var idname = req.body._id;
  var description = req.body.description;
  var task = req.body.task;
  /* This endpoint responds with all of the todos
   */
   //what are you going to send back to the client?
    return res.json({todos: todos});
    res.render({idname: idname, description: description, task: task});
    //todo objects should have properties _id, description, task

   });

app.post('/api/todos', function create(req, res) {
  /* This endpoint will add a todo to our "database"
   * and respond with the newly created todo.
   */

    var todo = new Todo({'_id': req.params.id, 'task': req.params.task, 'description': req.params.description});
    console.log(todo);

    //i 

    todo.save(function(err) {
      if(err) res.json({message: 'Could not create todo because ' + err});
      res.redirect("/todos");
    });
});

app.get('/api/todos/:id', function show(req, res) {
  var id = req.params.id;
  /* This endpoint will return a single todo with the
   * id specified in the route parameter (:id)
   */

   if (id == "task") {
    console.log("yes, new todo!");
    res.render("task");
   } else {
   todos.findById({_id: id}, function (err, todo) {
    if(err) {
        res.json({message: 'Could not find todo because error: ' + err});
      } else
      console.log(res.params);
      res.json({todos: todos});
      res.render('./index.js', {todos: todos});
   });
 }
});


app.put('/api/todos/:id', function update(req, res) {
  /* This endpoint will update a single todo with the
   * id specified in the route parameter (:id) and respond
   * with the newly updated todo.
   */


var id = req.params.id;
todos.findById({_id: id}, function (err, todo) {
  if (err) res.json ({message: 'Could not updated todo: ' + err});

  if (req.params.text) {
    todo.text = req.params.text;
  }

  console.log(todo);
  todo.save(function(err) {
    if(err) res.json({message: 'Could not save updated todo: ' + err});

    res.redirect('/app');
  });
});

});

app.delete('/api/todos/:id', function destroy(req, res) {
  /* This endpoint will delete a single todo with the
   * id specified in the route parameter (:id) and respond
   * with success.
   */

   var id = req.params.id;
   todo.remove({_id: id}, function (err) {
    if (err) res.json ({message: 'Could not delete: ' + err});

    res.redirect('/app');
   });
});

/**********
 * SERVER *
 **********/

// listen on port 3000, start with node server.js
app.listen(3000, function() {
  console.log('Server running on http://localhost:3000');
});
