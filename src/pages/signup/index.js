import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    height: "90vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: 40
  }
})

function Signup() {
  return (
    <section>
      <h1>Signup</h1>
    </section>
  );
}

export default Signup;
