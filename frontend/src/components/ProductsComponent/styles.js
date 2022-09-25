import {makeStyles} from '@material-ui/core/styles';

export default  makeStyles(()=>(
    {

        appBar: {
            borderRadius: 8,
            margin: '30px 0',
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor:"#FA334E",

            padding:"1%",
          },
          heading: {
            color: 'white',
              fontSize:"40px"
          },
          image: {
            marginLeft: '15px',
          },


    }));