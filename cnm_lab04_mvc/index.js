const  express = require('express')
var data = require('./store')
const multer = require('multer')
const app = express()
const upload = multer()

app.use(express.static('./templates'))
app.set('view engine', 'ejs')
app.set('views','./templates')

app.use(express.urlencoded({ extended: true }));

app.get('/', (req,res)=>{
    return res.render('index', {data :data})
})


// "id":"1",
// "name":"Cơ sở dữ liệu",
// "course_type":"Cơ sở",
// "semester":"HK1-2023-2024",
// "":"K.CNTT" 
app.post('/add', upload.fields([]) ,(req,res)=>{
    const {id, name, course_type, semester, department} = req.body;
    console.log(req.body.id)
    const newMonHoc = {id, name, course_type, semester, department}
    console.log(newMonHoc)
    data.push(newMonHoc);
    console.log("data", data)
    return res.redirect('/');
})

app.post('/delete', upload.fields([]), (req, res) => {
  const checkList = req.body.checked;
  console.log(checkList)
  if(checkList){
    for(i=0; i< checkList.length; i++){
      if(checkList){
        for(j=0;j<data.length;j++){
          data = data.filter(item => item.id != checkList[i])
        }
      }
    }
  }
  return res.redirect("/");
});

app.listen(4000, ()=>{
    console.log("server is running on port 4000")
})