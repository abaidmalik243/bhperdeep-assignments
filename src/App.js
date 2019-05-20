import React from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import CKEditor from "react-ckeditor-component";
// import moment from 'moment';
import $ from 'jquery';
// import './App.css';


function searchingFor(searchText) {
  return function (x) {
    return x.description.toLowerCase().includes(searchText.toLowerCase()) || !searchText;
  }
}

const heading = { textAlign: 'center', paddingTop: '20px', paddingBottom: '100px' }
const tableHeadingClr = { color: 'blueviolet' }
const calendarIcon = { marginLeft: '5px', fontSize: '20px', }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
      news_date: new Date(),
      diplayTable: true,
      content: 'content',
      data: [
        {
          date: '20-05-2019',
          type: 'BRC',
          classification: '',
          description: "Detail information about the single record",
        },
        {
          date: '20-05-2019',
          type: 'BRC',
          classification: '',
          description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
        },
        {
          date: '20-05-2019',
          type: 'BRC',
          classification: '',
          description: "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s,",
        },
        {
          date: '20-05-2019',
          type: 'BRC',
          classification: '',
          description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.",
        },
        {
          date: '20-05-2019',
          type: 'BRC',
          classification: '',
          description: "It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages.",
        },
        {
          date: '20-05-2019',
          type: 'BRC',
          classification: '',
          description: "Simple content",
        },
        {
          date: '20-05-2019',
          type: 'BRC',
          classification: '',
          description: "Summary about the brc.",
        }
      ]
    }
    this.updateContent = this.updateContent.bind(this);
  }

  open_AdTimes_calender = () => {
    $('#ad_times_date_calender').click();
  }

  searchHandler = () => {
    this.setState({ searchText: this.refs.searchText.value });
  }

  showAll = () => {
    this.setState({ searchText: '' })
  }

  onChangedate = date => {
    this.setState({ news_date: date })
  }

  tableToggle = (e) => {
    e.preventDefault();
    this.setState({ diplayTable: !this.state.diplayTable })
  }

  handleSubmit = (e) => {
    e.preventDefault();
    console.log('Data is: ', this.state.content)
  }
  // text editor

  updateContent(newContent) {
    this.setState({
      content: newContent
    })
  }

  onChange = (evt) => {
    console.log("onChange fired with event info: ", evt);
    var newContent = evt.editor.getData();
    this.setState({
      content: newContent
    })
  }

  onBlur(evt) {
    console.log("onBlur event called with event info: ", evt);
  }

  afterPaste(evt) {
    console.log("afterPaste event called with event info: ", evt);
  }

  render() {
    const { data } = this.state;
    return (
      <div>
        <h2 style={heading}>Assignment # 01, 02</h2>

        <form onSubmit={this.handleSubmit}>

          <div className="container">
            <div className="row">
              <div className="col-md-4">
                <label>NEWS DATE: </label>
                <DatePicker className="form-control"
                  selected={this.state.news_date}
                  onChange={this.onChangedate}
                  id="ad_times_date_calender"
                />
                <i className="fa fa-calendar" style={calendarIcon} aria-hidden="true" onClick={this.open_AdTimes_calender}></i>

                <br />
                <br />
                {this.state.diplayTable ?
                  <button onClick={this.tableToggle}>Post News</button>
                  :
                  <button onClick={this.tableToggle}>Expand News</button>
                }
              </div>
              <div className="col-md-8">
                <CKEditor
                  activeClass="p10"
                  content={this.state.content}
                  events={{
                    "blur": this.onBlur,
                    "afterPaste": this.afterPaste,
                    "change": this.onChange
                  }}
                />
                <br />
                <input type="submit" value="SAVE" style={{ float: 'right' }} />
              </div>
            </div>
          </div>


          <br />
          <br />
        </form>

        <div className="table-responsive">
          <table className="table" style={{ width: '100%' }}>
            <thead style={tableHeadingClr}>
              <tr>
                <th>DATE</th>
                <th>TYPE</th>
                <th>CLASSIFICATION</th>
                <th>
                  <span>RECORD FOUND: {data.length} </span>
                  <span style={{ color: 'black', marginLeft: '20px' }}>
                    <input type="checkbox" onClick={this.showAll} /> SHOW ALL
                  </span>

                  <div style={{ float: 'right' }}>
                    <span>Filter </span>
                    <input type="text" placeholder="Search..." ref="searchText" name="searchText" />
                    <button onClick={this.searchHandler} >Go</button>
                    <button onClick={this.showAll}>All</button>
                  </div>
                </th>
                <th>Action</th>
              </tr>
            </thead>
            {this.state.diplayTable ?

              <tbody>
                {data.length > 0 ?
                  data.filter(searchingFor(this.state.searchText)).map((record, index) => {

                    return (
                      <tr key={index}>
                        <td>{record.date}</td>
                        <td>{record.type}</td>
                        <td>{record.classification}</td>
                        <td>{record.description}</td>
                        <td>
                          <button>Delete</button>
                        </td>
                      </tr>
                    )

                  })
                  : <tr><td colSpan="4">No Found</td></tr>
                }
              </tbody>
              :
              <tbody></tbody>
            }
          </table>
        </div>
      </div>
    );
  }
}

export default App;
