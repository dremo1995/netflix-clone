import React, { useRef } from 'react';
import { CssBaseline } from '@mui/material';
import { Route, Switch } from 'react-router-dom';
import useStyles from './styles';
import useAlan from './Alan';

import { Actors, MovieInformation, Movies, Navbar, Profile } from '.';

const App = () => {
  const classes = useStyles();
  const alanBtnContainer = useRef();
  useAlan();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Navbar />
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route exact path={['/', '/approved']} component={Movies} />
          <Route exact path="/profile/:id" component={Profile} />
          <Route exact path="/movie/:id" component={MovieInformation} />
          <Route exact path="/actors/:id" component={Actors} />

        </Switch>
      </main>
      <div ref={alanBtnContainer} />
    </div>
  );
};

export default App;
