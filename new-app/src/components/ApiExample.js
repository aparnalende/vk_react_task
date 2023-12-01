
import axios from 'axios';

import Avatar from '@mui/material/Avatar';

import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  TextField,
  Button,
  CardHeader,
  Toolbar,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';

const ApiExample = () => {
  const [repos, setRepos] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortOption, setSortOption] = useState('stars');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
            // `https://developer.github.com/v3/search/`
          `https://api.github.com/search/repositories?q=${searchQuery}&sort=${sortOption}`
        );
        setRepos(response.data.items);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [searchQuery, sortOption]);

  return (

    <Container>
<div className='div'>
    

<TextField
      label="Search"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
    />

<FormControl>
    
      <Select
        labelId="select-label"
        variant='outlined'
        id="select"
        value={sortOption}
        onChange={(e)=>{setSortOption(e.target.value)}}
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        <MenuItem value="stars">Stars</MenuItem>
          <MenuItem value="watchers">Watchers</MenuItem>
          <MenuItem value="score">Score</MenuItem>
          <MenuItem value="name">Name</MenuItem>
           <MenuItem value="created_at">Created At</MenuItem>
           <MenuItem value="updated_at">Updated At</MenuItem>
      </Select>
    </FormControl>
</div>

             <Grid container spacing={3}>
      {repos.map((item) => (
        <Grid item key={item.id} xs={12} sm={6} md={4}>
          <Card>
          <CardHeader className='card_header'
          avatar={
            <Avatar src={item.owner.avatar_url} alt="Avatar Image" />
          }      
        />
            <CardContent className=''>
              <Typography variant="h6">{item.title}</Typography>
              <Typography>Stars: {item.stargazers_count}</Typography>
           <Toolbar title={item.description}> <Typography className='card'>Description: {item.description}</Typography></Toolbar>
             <Typography>Language: {item.language}</Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  </Container>

  );
};

export default ApiExample;
