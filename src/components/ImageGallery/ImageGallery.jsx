import { useState, useEffect } from "react";
import PropTypes from "prop-types";
import css from "./ImageGallery.module.css";
import getImages from "../../Api/imgApi";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Button from "../Button/Button";
import Loader from "../Loader/Loader";

const ImageGallery = ({ onClick, inputValue, page, loadMoreBtn }) => {
    const [images, setImages] = useState([]);
    const [status, setStatus] = useState("idle");
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchLoad = async () => {
            setLoading(true);

            try {
                const response = await getImages(inputValue, page);

                if (!mounted.current) return;

                if (response.hits.length > 0) {
                    setImages(response.hits);
                    setStatus("resolved");
                } else {
                    setStatus("rejected");
                }
            }
            catch (error) {
                setStatus("rejected");
            }
            finally {
                setLoading(false);
            }
        };

        const mounted = { current: true };

        if (inputValue !== "" && page === 1) {
            fetchLoad();
        }

        return () => {
            mounted.current = false;
        };
    }, [inputValue, page]);

    useEffect(() => {
        const fetchLoadMore = async () => {
            try {
                const response = await getImages(inputValue, page);

                if (!mounted.current) return;

                if (response.hits.length > 0) {
                    setImages((prevState) => [...prevState, ...response.hits]);
                    setStatus("resolved");
                } else {
                    setStatus("rejected");
                }
            }
            catch (error) {
                setStatus("rejected");
            }
        };

        const mounted = { current: true };

        if (page > 1) {
            fetchLoadMore(); 
        };

        return () => { 
            mounted.current = false;
        };
    }, [inputValue, page]);

    if (loading) {
        return <Loader />;
    }

    if (status === "resolved") {
        return (
                <>
                        <ul className={css.ImageGallery}>
                            {images.map(({ id, largeImageURL, tags }) => (
                                <ImageGalleryItem
                                    key={id}
                                    url={largeImageURL}
                                    tags={tags}
                                    onClick={onClick}
                                />
                            ))}
                        </ul>
                    {images.length !==0 ? (
                    <Button onClick={loadMoreBtn} />
                    ) : (
                        alert("No more images")
                    )}
                </>
            );
        }
        return null;
    };

ImageGallery.propTypes = {
    onClick: PropTypes.func.isRequired,
    inputValue: PropTypes.string.isRequired,
    page: PropTypes.number.isRequired,
    loadMoreBtn: PropTypes.func.isRequired,
};

export default ImageGallery;

