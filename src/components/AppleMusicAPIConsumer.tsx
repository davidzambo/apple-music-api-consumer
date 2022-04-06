import React, {useEffect, useState} from 'react';
import {Grid, Paper, Stack, Typography} from "@mui/material";
import {SearchBox} from "./SearchBox";
import {SearchResult} from "../@types/local";

const AppleMusicAPIConsumer: React.FC = () => {
  const [searchResults, setSearchResults] = useState<Array<string>>([]);
  const [listToShow, setListToShow] = useState(["A", "B", "C", "D", "E"]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>("");

  const handleSearch = async (term: string) => {
    try {
      setError("")
      const response = await fetch(`https://itunes.apple.com/search?term=${term}`);
      const data = await response.json();
      const first5albums = Array.from(
        new Set<string>(data.results.map((result: SearchResult) => result.collectionName))
      )
        .sort((a :string, b: string) => a.localeCompare(b))
        .slice(0,5);

      setSearchResults(first5albums);
    } catch (e) {
      setError("Failed to fetch");
    }
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const rotatedResults = [...listToShow.slice(1)];

      rotatedResults.push(searchResults[0] || listToShow[0]);

      if (searchResults[0]) {
        setSearchResults(searchResults.slice(1));
      }

      setListToShow(rotatedResults)
    }, 1000);

    return () => clearInterval(timer);
  });


  return (
    <Paper elevation={3} sx={{py: 8, px: 4}}>
      <Grid container spacing={4} direction={"column"} justifyContent={"center"} alignContent={"center"}>
        <Grid item xs={12} md={10}>
          <Typography variant="h1" component="h1" align={"center"}>
            Apple Music<br/>API consumer
          </Typography>
        </Grid>
        <Grid item xs={12} md={8} justifyContent={"center"}>
          <SearchBox onSearch={handleSearch} loading={loading} setLoading={setLoading}/>
        </Grid>
        <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            {listToShow.map((result, idx) =>
              <Paper key={idx}>{result}</Paper>
            )}
          </Stack>
        </Grid>
        {error && <Grid item xs={12} md={8}>
          <Stack spacing={4}>
            {error}
          </Stack>
        </Grid>}
      </Grid>
    </Paper>
  )
}

export {AppleMusicAPIConsumer}
