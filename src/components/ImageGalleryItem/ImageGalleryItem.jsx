import PropTypes from 'prop-types';
import css from './ImageGalleryItem.module.css';

export default function ImageGalleryItem({ url, tags, onClick }) {
    return (
        <>
            <li className={css.imageGalleryItem}>
                <img src={url} alt={tags} className={css.imageGalleryItemImage} onClick={() => onClick(url)} />
            </li>
        </>
    );
};

ImageGalleryItem.propTypes = {
    url: PropTypes.string.isRequired,
    tags: PropTypes.string.isRequired,
    onClick: PropTypes.func.isRequired,
};