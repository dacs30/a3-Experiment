import './App.css';
import Introductions from './Pages/Introductions';
import React, { useState, useEffect, useRef } from 'react';
import Buttons from './Components/Buttons';
import ChartArea from './Components/ChartArea';
import { Grid, TextField } from '@mui/material';
import { styled } from '@mui/material/styles';
import MaterialTable from 'material-table'

const CssTextField = styled(TextField)({
  // change color of label to white
  '& .MuiInputBase-input': {
    color: 'white',
  },
  '& .MuiInput-placeholder': {
    color: 'white',
  },
  '& label.Mui-focusVisible': {
    color: 'white',
  },
  '& label.Mui-focused': {
    color: 'white',
  },
  '& .MuiInput-underline:after': {
    borderBottomColor: 'white',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: 'white',
    },
    '&:hover fieldset': {
      borderColor: 'white',
    },
    '&.Mui-focused fieldset': {
      borderColor: 'white',
    },
  },
});

function App() {
  const [page, changePage] = useState(0);
  const [trials, changeTrials] = useState([]);
  const [currentChart, changeCurrentChart] = useState('');
  let textInput = useRef(null);

  let truePercentages = [69.23,
    66.67, 87.95, 11.48, 97.83, 51.79, 20.62, 5.56, 39.02, 64.52,
    15.48, 60.00, 8.06, 72.22, 73.47, 100, 28.95, 36.17, 30.91, 85.51, 34.29,
    28.57, 50.00, 93.98, 47.30,
    94.68, 97.65, 33.87, 52.08, 36.84, 87.50, 18.68, 95.38, 22.58, 89.01,
    72.62, 3.90, 5.21, 73.81, 36.67, 15.00, 58.33, 72.73, 8.57, 67.11, 79.55,
    72.09, 79.55, 8.97, 94.87,
    64.56, 67.02, 89.47, 45.83, 15.91, 6.56, 29.55, 25.00, 77.78, 96.72, 95.79,
    76.81, 97.73, 8.08, 81.54, 26.09, 63.33, 34.44, 74.07, 17.39, 64.63, 31.48,
    88.71, 81.82, 30.86
  ];

  const makeid = (length) => {
    var result = '';
    var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
      result += characters.charAt(Math.floor(Math.random() *
        charactersLength));
    }
    return result;
  }

  let trial = {
    trialid: '',
    truePercentage: 0,
    repPercentage: 0,
    type: 'barchart',
    participantId: '',
  };

  useEffect(() => {
    if (trials.length === 0) {
      trial.participantId = makeid(10);
      trial.trialid = makeid(10);
    } else {
      trial.participantId = trials[trials.length - 1].participantId;
      trial.trialid = makeid(10);;
    }
  });

  const addTrial = () => {
    trial.type = page < 26 ? 'barchart' : page < 51 ? 'donutchart' : 'piechart';
    trial.truePercentage = truePercentages[page - 1];
    textInput.current.value = '';
    changeTrials([...trials, trial]);
    console.log(trials);
    changePageFcn();
  }

  const updateChartType = (type) => {
    changeCurrentChart(type);
  }

  const changePageFcn = () => {
    let newPage = page + 1;
    changePage(newPage);
  }

  const changeRepPercentage = (e) => {
    trial.repPercentage = e.target.value;
  }

  return (
    <div className="App-header">
      <header>
        {<Introductions numPage={page} />}
        <div style={{ textAlign: 'center' }}>
          {page > 0 && page < 76 ? <ChartArea numPage={page} updateChartType={updateChartType} /> : null}
        </div>
        {page === 76 ?
          <div style={{ textAlign: 'center' }}>
            <p>Thank you for your participation!</p>
            <p>Please send the CSV to dcorreiadasilva@wpi.edu</p>
            <p>Your results:</p>
            <MaterialTable
              style={{ "marginBottom": "20px" }}
              title="Results"
              options={{
                search: false,
                paging: false,
                sorting: false,
                draggable: false,
                headerStyle: {
                  backgroundColor: '#01579b',
                  color: '#FFF'
                },
                exportButton: true
              }}
              columns={[
                { title: 'Participant ID', field: 'participantId' },
                { title: 'Trial ID', field: 'trialid' },
                { title: 'True Percentage', field: 'truePercentage' },
                { title: 'Reported Percentage', field: 'repPercentage' },
                { title: 'Chart Type', field: 'type' },
              ]}
              data={trials}
            />
          </div>
          :
          <div>
            <Grid style={{ marginTop: "15px" }} justifyContent={'center'} container rowSpacing={2} >
              {page > 0 ?
                <Grid item xs={12}>
                  <div style={{ "textAlign": 'center' }}>
                    <p style={{ 'fontSize': '30' }}>What do you think the percent of the smaller value to the larger value?</p>
                    <p>(Eg.: if you think the smaller is exactly half of the bigger one, input 50 )</p>
                  </div>
                </Grid> : <></>}
              {page > 0 ? <Grid item>
                <CssTextField
                  id="input-textfield"
                  inputRef={textInput}
                  onChange={changeRepPercentage}
                  label="Percentage of Difference"
                  InputLabelProps={
                    {
                      style: {
                        color: 'white',
                      },
                    }
                  }
                  id="custom-css-outlined-input" />
              </Grid> : <></>}
              <Grid item xs={12}>
                <Buttons
                  numPage={page}
                  changePageFcn={changePageFcn}
                  addTrial={addTrial}
                />
              </Grid>
            </Grid>
          </div>}
      </header>
    </div>
  );
}

export default App;
