import React from "react";
import PropTypes from "prop-types";
import { Card } from "react-bootstrap";

function BookCard({ title, author, price, viewMode = 'grid', onClick }) {
    const isList = viewMode === 'list';
    return (
        <Card className={`mb-3 ${isList ? 'd-flex flex-row' : ''}`} onClick={onClick} style={{ cursor: onClick ? 'pointer' : 'default' }}>
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                {isList ? (
                    <div>
                        <strong>Author:</strong> {author} | <strong>Price:</strong> ${price}
                    </div>
                ) : (
                    <>
                        <Card.Text>
                            <strong>Author:</strong> {author}
                        </Card.Text>
                        <Card.Text>
                            <strong>Price:</strong> ${price}
                        </Card.Text>
                    </>
                )}
            </Card.Body>
        </Card>
    );
}

BookCard.propTypes = {
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    viewMode: PropTypes.oneOf(['grid', 'list']),
    onClick: PropTypes.func,
};

export default BookCard;
