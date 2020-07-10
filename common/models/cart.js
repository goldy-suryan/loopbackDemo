'use strict';

module.exports = function(Cart) {

    Cart.addProductToCart = function(product_id, callback) {
        Cart.create({ product_id: [product_id] }, (err, cart) => {
            if(err) return callback(err);
            return callback(null, cart);
        });
        
    }

    Cart.updateCart = function(id, product_id, callback) {
        console.log(id, product_id)
        Cart.findOne({ where: {id}}, (err, cart) => {
            if(!err && cart) {
                Cart.update({id}, { $addToSet: { product_id }}, (err, cart) => {
                    if(err) {
                        return callback(err)
                    }
                    callback (null, cart);
                });
            } else {
                callback(err, null);
            }
        });
    }

    Cart.removeProductFromCart = function(id, product_id, callback) {
        Cart.findOne({ id }, (err, cart) => {
            if(!err && cart) {
                Cart.update({ id }, { $pull: { product_id }}, (err, cart) => {
                    if(err) return callback(err);
                    callback(null, cart);
                })
            } else {
                callback(err);
            }
        });
    }

    Cart.remoteMethod('addProductToCart', {
        accepts: [
            {
                arg: 'product_id',
                type: 'string',
                description: 'product id',
                required: true,
                http: {
                    source: 'form'
                }
            }
        ],
        returns: {arg: 'cart', type: 'object'},
        http: {verb: 'post', path: '/addToCart', source: 'body'},
        description: 'add product to the cart'
    });

    Cart.remoteMethod('updateCart', {
        accepts: [
            {
                arg: 'id',
                type: 'string',
                description: 'cart id',
                required: true,
                http: {
                    source: 'path'
                }
            },
            {
                arg: 'product_id',
                type: 'string',
                description: 'product id',
                required: true,
                http: {
                    source: 'form'
                }
            }
        ],
        returns: {arg: 'cart', type: 'object'},
        http: {verb: 'put', path: '/:id/updateCart', source: 'body'},
        description: 'update product to the cart'
    });

    Cart.remoteMethod('removeProductFromCart', {
        accepts: [
            {
                arg: 'id',
                type: 'string',
                description: 'cart id',
                required: true,
                http: {
                    source: 'path'
                }
            },
            {
                arg: 'product_id',
                type: 'string',
                description: 'product id',
                required: true,
                http: {
                    source: 'form'
                }
            }
        ],
        returns: {arg: 'cart', type: 'object'},
        http: {verb: 'put', path: '/:id/removeFromCart', source: 'body'},
        description: 'remove product from the cart'
    });
};
