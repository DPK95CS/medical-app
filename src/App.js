import React from 'react';
import './App.css';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

let main_category=['CT','MRI','ULTRASOUND','X-RAY','BREAST MRI'
,'BREAST ULTRASOUND','DEXA','MAMMOGRAPHY','NUCLEAR','PET/CT'];

let sub_category =new Map([
  ['CT',['ABDOMEN','PELVIS','HEART','SPINE']],
  ['MRI',['HEART','UROGRAM','SPINE']]
]);

let device_category = new Map([
  ['ABDOMEN',['ANGIOGRAM','XRAY']]
]);

let area_category = new Map([
  ['ANGIOGRAM',['VELACHERY','MADIPAKKAM']],['XRAY',['TNAGAR']]
]);

let lab_category = new Map([
  ['VELACHERY',['PRO SCANS','BHARATH SCANS']],['MADIPAKKAM',['WESTMINSTER','HI TECH']]
]);

const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    flexWrap: 'wrap',
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));

function DateAndTimePickers() {
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

class App extends React.Component
{

  constructor(props) {  
    super(props);
    this.state = {fname:  '',lname: '',gender: '',date : new Date(),time: '10:00',
  main_category_item:'',
  sub_category_item : '',device_category_item:'',area_category_item:'',lab_category_item:'',items:[],currentevent:'click'};
  for(var i=0;i<main_category.length;i++)
  {
      this.state.items.push(<button onClick={this.main_category_Click.bind(this,main_category[i])}>{main_category[i]}</button>)
  } 
  this.submitClicked = this.submitClicked.bind(this);
  this.handleChangefname = this.handleChangefname.bind(this);
  this.handleChangelname = this.handleChangelname.bind(this);
  this.handleChangegender = this.handleChangegender.bind(this);
  this.payment = this.payment.bind(this);
  }
  payment()
  {
    console.log('payment')
    this.setState(state => ({
      currentevent : 'payment'
    }));
  }
  handleChangefname(event) {
    this.setState({fname: event.target.value});
    console.log(event.target.value)
  }
  handleChangelname(event) {
    this.setState({lname: event.target.value});
    console.log(event.target.value)
  }
  handleChangegender(event) {
    this.setState({gender: event.target.value});
    console.log(event.target.value)
  }
  submitClicked()
  {
    console.log("submit clicked")
    this.setState(state => ({
      currentevent : 'dateandtime'
    }));
  }
  lab_category_Click(lab_item)
  {
    this.setState(state => ({
      lab_category_item : lab_item,
      currentevent : 'form',
    }));

  }
  area_category_Click(area_item)
  {
    var i
    var labcategories = []
    var lab_category_items = lab_category.get(area_item)
    for(i=0;i<lab_category_items.length;i++)
    {
      labcategories.push(<button onClick={this.lab_category_Click.bind(this,lab_category_items[i])}>{lab_category_items[i]}</button>)
    }
    this.setState(state => ({
      items: labcategories,
      area_category_item : area_item
    }));
  }
  device_category_Click(device_item)
  {
    var i
    var areacategories = []
    var area_category_items = area_category.get(device_item)
    for(i=0;i<area_category_items.length;i++)
    {
      areacategories.push(<button onClick={this.area_category_Click.bind(this,area_category_items[i])}>{area_category_items[i]}</button>)
    }
    this.setState(state => ({
      items: areacategories,
      device_category_item : device_item
    }));
  }

  sub_category_Click(sub_item) {
    var i
    var devicecategories = []
    var device_category_items = device_category.get(sub_item)
    for(i=0;i<device_category_items.length;i++)
    {
      devicecategories.push(<button onClick={this.device_category_Click.bind(this,device_category_items[i])}>{device_category_items[i]}</button>)
    }
    this.setState(state => ({
      items: devicecategories,
      sub_category_item : sub_item
    }));
  }
  main_category_Click(main_item) {
    var i
    var subcategories = []
    var sub_category_items = sub_category.get(main_item)
    for(i=0;i<sub_category_items.length;i++)
    {
      subcategories.push(<button onClick={this.sub_category_Click.bind(this,sub_category_items[i])}>{sub_category_items[i]}</button>)
    }
    this.setState(state => ({
      items: subcategories,
      main_category_item : main_item
    }));
  }
  render()
  {
    if(this.state.currentevent==='click')
    {
      return (
          <div>
            <h1>BOOK SCAN</h1>
            {this.state.items}
          </div>
          );
    }
    else if(this.state.currentevent==='form')
    {
      return(
        <div>
          <h1>DATA ENTRY
            </h1>
        <form onSubmit={this.submitClicked}>
        <label>
          FIRST NAME:
          <input type="text" value={this.state.fname} onChange={this.handleChangefname} />
        </label>
        <label>
          LAST NAME:
          <input type="text" value={this.state.lname} onChange={this.handleChangelname} />
        </label>
        <label>
          GENDER:
          <input type="text" value={this.state.gender} onChange={this.handleChangegender} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      </div>
      );
    }
    else if(this.state.currentevent==="dateandtime")
    {
      return(
        <div>
        <h1>PICK DATE AND TIME</h1>
        <DateAndTimePickers/>
        <button onClick={this.payment}>NEXT</button>
          </div>
        );
    }
    else
    {
      return(
        <div>
        <h1>PAYMENT PAGE</h1>
        <button>PAYMENT</button>
          </div>
        );
    }
  }
}
export default App;
/*import {SingleDatePicker} from 'react-dates';
import Calendar from 'react-calendar';
import TimePicker from 'react-time-picker';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
const CT = ['ABDOMEN','ABDOMEN AND PELVIS','HEART','HEAD/BRAIN','NECK','PELVIS']
const ABDOMEN = ['ANGIOGRAM']
const PLACES = ['VELACHERY','ANNANAGAR','PALLAVARAM']
//const TREATMENT = [[['CTABDOMENANGIOGRAM','MRIHEARTANGIOGRAM'],[['SRI KRISHNA SCANS']]]]
const TREATMENT = [[['CTABDOMENANGIOGRAM'],['A SCAN',' B SCAN']],[['CTABDOMENANGIOGRAM'],['C SCAN',' D SCAN']]]
console.log(TREATMENT)
console.log(TREATMENT[0][0][0])
console.log(TREATMENT[0][1][0])

class App extends React.Component {
  constructor(props) {  
    super(props);
    this.state = {first : ['CT','MRI','ULTRASOUND','X-RAY','BREAST MRI'
  ,'BREAST ULTRASOUND','DEXA','MAMMOGRAPHY','NUCLEAR','PET/CT'],form:0,selected:'',currentStep: 1,
  fname:  '',
  lname: '',
  gender: '',date : new Date(),time: '10:00'};
    this.handleButtonClick = this.handleButtonClick.bind(this);
  }

  handleChange = event => {
    if(this.state.currentStep===2)
    {
      console.log(event)
      this.setState({
        date : event
      })
    }
    else
    {
      console.log(event)
    const {name, value} = event.target
    console.log(name)
    console.log(value)
    this.setState({
      [name]: value
    })  
  }
}


  handleSubmit = event => {
    event.preventDefault()
    const { fname, lname, gender } = this.state
    alert(`Your registration detail: \n 
           FName: ${fname} \n 
           Lname: ${lname} \n
           Gender: ${gender}`)
  }
  
  _next = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 2? 3: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
    
  _prev = () => {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

previousButton() {
  let currentStep = this.state.currentStep;
  if(currentStep !==1){
    return (
      <button 
        className="btn btn-secondary" 
        type="button" onClick={this._prev}>
      Previous
      </button>
    )
  }
  return null;
}

nextButton(){
  let currentStep = this.state.currentStep;
  if(currentStep <3){
    return (
      <button 
        className="btn btn-primary float-right" 
        type="button" onClick={this._next}>
      Next
      </button>        
    )
  }
  return null;
}

  handleButtonClick(i) {
    var list = []
    var i1,i2,i3
    if(i==='CT')
      list = CT
    if(i==='ABDOMEN')
    {
      list = ABDOMEN

    }
    if(i==='ANGIOGRAM')
    {
      for(i1=0;i1<TREATMENT.length;i1++)
      {
        for(i2=0;i2<TREATMENT[i1][0].length;i2++)
        {
          if(TREATMENT[i1][0][i2]===(this.state.selected + i))
          {
            list.push(PLACES[i1])
          }
        }
      }
    }
      //console.log(this.state.selected)
      //console.log(this.state.selected + i)

    if(i==='PALLAVARAM')
    {
        for(i1=0;i1<PLACES.length;i1++)
        {
          if(PLACES[i1]===i)
          {
            for(i2=0;i2<TREATMENT[i1][1].length;i2++)
            {
              list.push(TREATMENT[i1][1][i2])
            }
          }
        }
        this.setState(state => ({
          form : 1
        }));
    }
    console.log(list)
    this.setState(state => ({
      first : list,
      selected: state.selected+i
    }));
  }

  render() {
    const {page,first,next,selected,form} = this.state

    var firstitems = []
    console.log(page)
    console.log(first)  
    console.log(next)
    console.log(selected)
    var i
      for(i=0;i<first.length;i++)
      {
      firstitems.push(<button onClick={this.handleButtonClick.bind(this,first[i])}>{first[i]}</button>)
    }
    if(form===0)
    {
    return (
      <div>
          {selected}
          {firstitems}
      </div>
    );
    }
    else
    {
      return(
        <React.Fragment>
        <h1>React Wizard Form 🧙‍♂️</h1>
        <p>Step {this.state.currentStep} </p> 
  
        <form onSubmit={this.handleSubmit}>
        {}
          <Step1 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            fname={this.state.fname}
          />
          <TimePickers 
          currentStep
          />
          <Step3 
            currentStep={this.state.currentStep} 
            handleChange={this.handleChange}
            password={this.state.gender}
          />
          {this.previousButton()}
          {this.nextButton()}
  
        </form>
        </React.Fragment>
      );
    }
  }
}

function Step1(props) {
  console.log(props)
  if (props.currentStep !== 1) {
    return null
  } 
  return(
    <div className="form-group">
      <label htmlFor="name">Name</label>
      <input
        className="form-control"
        id="fname"
        name="fname"
        type="text"
        placeholder="Enter fname"
        value={props.fname}
        onChange={props.handleChange}
        />
        <input
        className="form-control"
        id="lname"
        name="lname"
        type="text"
        placeholder="Enter lname"
        value={props.lname}
        onChange={props.handleChange}
        />
        <input
        className="form-control"
        id="gender"
        name="gender"
        type="text"
        placeholder="Enter lname"
        value={props.gender}
        onChange={props.handleChange}
        />
    </div>
  );
}

function TimePickers() {
  const useStyles = makeStyles((theme) => ({
    container: {
      display: 'flex',
      flexWrap: 'wrap',
    },
    textField: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      width: 200,
    },
  }));
  const classes = useStyles();

  return (
    <form className={classes.container} noValidate>
      <TextField
        id="datetime-local"
        label="Next appointment"
        type="datetime-local"
        defaultValue="2017-05-24T10:30"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
  );
}

function Step3(props) {
  if (props.currentStep !== 3) {
    return null
  } 
  return( 
    <React.Fragment>
    <div className="form-group">
      <label htmlFor="password">Password</label>
      <input
        className="form-control"
        id="password"
        name="password"
        type="password"
        placeholder="Enter password"
        value={props.gender}
        onChange={props.handleChange}
        />      
    </div>
    <button className="btn btn-success btn-block">Sign up</button>
    </React.Fragment>
  );
}
*/

