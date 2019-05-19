import React from 'react';
// import './App.css';


function searchingFor(searchText) {
  return function (x) {
    return x.description.toLowerCase().includes(searchText.toLowerCase()) || !searchText;
  }
}

const heading = { textAlign: 'center', paddingTop: '20px', paddingBottom: '100px' }

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      searchText: '',
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
  }

  searchHandler = () => {
    this.setState({ searchText: this.refs.searchText.value });
  }


  render() {
    const { data } = this.state;
    return (
      <div>
        <h2 style={heading}>Assignment # 01</h2>

        <div className="table-responsive">
          <table className="table" style={{ width: '100%' }}>
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>classification</th>
                <th>Filter
                  <input type="text" placeholder="Search..." ref="searchText" name="searchText" />
                  <button onClick={this.searchHandler} >Go</button>
                  <button onClick={() => {
                    this.setState({ searchText: '' })
                  }}>All</button>
                </th>
                <th>Action</th>
              </tr>
            </thead>
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
          </table>
        </div>
      </div>
    );
  }
}

export default App;
