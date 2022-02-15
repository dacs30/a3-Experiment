import React, { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { styled } from '@mui/material/styles';
import BarChart from './BarChart';
import PieChart from './PieChart';
import TreeChart from './TreeChart';



function ChartArea(props) {

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  let charts = [<BarChart />, <PieChart />, <TreeChart />];

  return (
    <div>
      <Grid justifyContent={'center'} container rowSpacing={1} columnSpacing={{ xs: 3, sm: 5, md: 5 }}>
        <Grid item>
          <Item>
            {/* {props.numPage < 11 ? charts[0] : props.numPage < 21 ? charts[1] : charts[2]} */}
            {props.numPage ?
              <img
                style={{ width: '350px' }}
                src={require(`../Charts/${props.numPage < 26 ? "B" + props.numPage + ".png" : props.numPage < 51 ? "D" + (props.numPage - 25) + ".png" : "P" + (props.numPage - 50) + ".png"}`)}
                alt="barChart" />
              : null}
          </Item>
        </Grid>
      </Grid>
    </div>
  );
}

export default ChartArea;
