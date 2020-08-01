const express = require('express');
const inventory = require('../models/Inventory');

const router = express.Router();

// main store route
router.get('/',(req,res) => {
    inventory.find({}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }

        const a = result;
        const b = a.sort().reverse();
        inventory.find({class: 'mobile'},null,{sort:{sells: 1}}, (err,popular) => {
            if(err){
                console.log(err);
                res.render('../views/500.ejs'); 
            }else{
                res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular});
            }
        })
    });
});

// popular and recent routes for every class

//dslrs
// router.get('/dslrs/recent', (req,res) => {
//     inventory.find({class: 'dslr'},null,{sort:{id: 1}}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });

// router.get('/dslrs/popular', (req,res) => {
//     inventory.find({class: 'dslr'},null,{sort:{sells: -1}}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });
// laptops

// router.get('/laptops/recent', (req,res) => {
//     inventory.find({class: 'laptop'},null,{sort:{id: 1}}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });

// router.get('/lpatops/popular', (req,res) => {
//     inventory.find({class: 'laptops'},null,{sort:{sells: -1}}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });

// mobiles

router.get('/mobiles/recent', (req,res) => {
    inventory.find({class: 'mobile'},null,{sort:{id: 1}}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

router.get('/mobiles/popular', (req,res) => {
    inventory.find({class: 'mobile'},null,{sort:{sells: -1}}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
    });
});

// catagory wise display
router.get('/mobiles', (req,res) => {
    inventory.find({class: 'mobile'}, (err,result) => {
        if(err){
            console.log(err);
            res.render('../views/500.ejs');
        }

        const a = result;
        const b = a.sort().reverse();
        inventory.find({class: 'mobile'},null,{sort:{sells: 1}}, (err,popular) => {
            if(err){
                console.log(err);
                res.render('../views/500.ejs'); 
            }else{
                res.render('../views/store.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular});
            }
        })
    });
});

// router.get('/laptops', (req,res) => {
//     inventory.find({class: 'laptop'}, (err,result) => {
//         if(err){
//             console.log(err);
//             res.render('../views/500.ejs');
//         }

//         const a = result;
//         const b = a.sort().reverse();
//         inventory.find({class: 'mobile'},null,{sort:{sells: 1}}, (err,popular) => {
//             if(err){
//                 console.log(err);
//                 res.render('../views/500.ejs'); 
//             }else{
//                 res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular});
//             }
//         })
//     });
// });

// router.get('/dslrs', (req,res) => {
//     inventory.find({class: 'dslr'}, (err,result) => {
//         if(err){
//             console.log(err);
//             res.render('../views/500.ejs');
//         }

//         const a = result;
//         const b = a.sort().reverse();
//         inventory.find({class: 'mobile'},null,{sort:{sells: 1}}, (err,popular) => {
//             if(err){
//                 console.log(err);
//                 res.render('../views/500.ejs'); 
//             }else{
//                 res.render('../views/index.ejs',{name: req.name, price: req.price, brand: req.brand, id: req.id, image:req.image, product: a, proRecent: b, popular: popular});
//             }
//         })
//     });
// });

// catagory and brand wise display

//dslrs
// router.get('/dslrs/cannon', (req,res) => {
//     inventory.find({class: 'dslr', brand:'  cannon '}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });

//laptops

// router.get('/laptops/apple', (req,res) => {
//     inventory.find({class: 'laptop',brand:'  apple '}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });

// router.get('/laptops/hp', (req,res) => {
//     inventory.find({class: 'laptop',brand:'  hp '}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });

// router.get('/laptops/dell', (req,res) => {
//     inventory.find({class: 'laptop', brand:'  dell '}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });

// router.get('/laptops/apple', (req,res) => {
//     inventory.find({class: 'laptop', brand:'  lenovo '}, (err,result) => {
//         if(err) {
//             console.log(err);
//             res.render('../views/500.ejs');
//         }
//         else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result});
//     });
// });

//mobiles

router.get('/mobiles/apple', (req,res) => {
    inventory.find({$and:[{class: 'mobile', brand:'apple'}]}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result, product: 'mobile', brand: 'apple'});
    });
});

router.get('/mobiles/oneplus', (req,res) => {
    inventory.find({class: 'mobile', brand:'oneplus'}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result, product: 'mobile', brand: 'oneplus'});
    });
});

router.get('/mobiles/samsung', (req,res) => {
    inventory.find({class: 'mobile', brand:'  samsung '}, (err,result) => {
        if(err) {
            console.log(err);
            res.render('../views/500.ejs');
        }
        else res.render('../views/storeCatagory.ejs', {id: req.id,class: req.class, brand: req.brand, name: req.name,price: req.price,inventories: result, product: 'mobile', brand: 'samsung'});
    });
});

module.exports = router;