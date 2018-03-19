import React from 'react';
import styles from './stateless.css';

export const Title = (props) => {
  return(
    <div>
      <div>Get Spotify Track Features</div>
      <div></div>
    </div>
  );
};


export const SignIn = (props) => {
  return(
    <div>
      <a
        href="/auth/spotify"
      >
        <button>
          Sign In With Your Spotify Account
        </button>
      </a>
    </div>  
  );
};

export const ArtistTitle = (props) => {
  const artist = props.artist;
  return(
    <div className={styles.container}>
      <img
        className={styles.img}
        src={artist.images[2].url}
      />
      <div className={styles.artist}> 
        {artist.name}
      </div>
      <div className={styles.genreContainer}>
        {artist.genres.map((genre, index) => {
          return(
            <div 
              className={styles.genre}
              key={index}
            >
              {genre}
            </div>
          );
        })}
      </div>
    </div>
  );
};