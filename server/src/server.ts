import express from 'express'; 
import routes from './routes';
import path from 'path';
import cors from 'cors';

// quando lidamos com caminhos usamos path

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);
 
app.use('/uploads', express.static(path.resolve(__dirname, '..', 'uploads' )))

app.listen(3333, "", () => {
    console.log("App running at 3333")
}); 