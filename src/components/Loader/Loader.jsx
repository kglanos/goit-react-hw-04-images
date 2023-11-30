import { Bars } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
    return (
        <div className={css.Loader}>
            <Bars
                height="100"
                width="100"
                color="#495057"
                ariaLabel="bars-loading"
                wrapperStyle={{}}
                wrapperClass=""
                visible={true}
                />
        </div>
    );
};