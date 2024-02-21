import { Grid } from '@mui/material'
import ReactLoading from 'react-loading'

const Loading = ({ type, color }) => {
    return (
        <Grid
            container
            spacing={0}
            direction="column"
            alignItems="center"
            justifyContent="center"
            style={{ minHeight: '80vh' }}>
            <ReactLoading type={type} color={color} height={'10%'} width={'10%'} />

        </Grid>
    )
}

export default Loading
