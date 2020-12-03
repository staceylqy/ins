import React from "react";
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Hidden from '@material-ui/core/Hidden';


const Post = ({ id, title, text, image, timestamp })=> {
const useStyles = makeStyles({
  card: {
    display: 'flex',
  },
  cardDetails: {
    flex: 1,
  },
  cardMedia: {
    width: 160,
  },
});


  const classes = useStyles();


    return (

        <CardActionArea component="a" href="#">
          <Card className={classes.card}>
            <div className={classes.cardDetails}>
              <CardContent>
                {/* 記述1.タイトル情報が渡ってくる */}
                <Typography component="h2" variant="h5">
                  {title}
                </Typography>
                <Typography variant="subtitle1" color="textSecondary">
                  {new Date(timestamp?.toDate()).toLocaleString()}
                </Typography>
                {/* 記述3.タイトル情報が渡ってくる */}
                <Typography variant="subtitle1" paragraph>
                  {text}
                </Typography>
                
              </CardContent>
              
            </div>
            {/* 記述4.画像を表示 imgタグを使う */}
            <Hidden xsDown>
              <CardMedia 
                className={classes.cardMedia} image={image} title={title} />
            </Hidden>
          </Card>
          
        </CardActionArea>
 
    );
  
}
export default Post;