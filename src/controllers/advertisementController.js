const advertisementQueries = require("../db/queries.advertisement.js");

module.exports = {
    index(req, res, next){
        advertisementQueries.getAllAdvertisements((err, advertisement) => {
            if(err){
                res.redirect(500, "static/index");
            } else {
                res.render("advertisement/index", {advertisement});
            }
        });
    },

    new(req, res, next){
        res.render("advertisement/new");
    },

    create(req, res, next){
        let newAd = {
          title: req.body.title,
          description: req.body.description
        };
        advertisementQueries.createAd(newAd, (err, ad) => {
            if(err){
                res.redirect(500, "/advertisement/new");
            } else {
                res.redirect(303, `/advertisement/${ad.id}`);
            }
        });
    },

    show(req, res, next){
        advertisementQueries.getAd(req.params.id, (err, ad) => {
            if(err || ad == null){
                res.redirect(404, "/");
            } else {
                res.render("advertisement/show", {ad});
            }
        });
    },

    destroy(req, res, next){
        advertisementQueries.deleteAd(req.params.id, (err, ad)=>{
            if(err){
                res.redirect(500, `/advertisement/${ad.id}`)
            } else {
                res.redirect(303, "/advertisement")
            }
        });
    },

    edit(req, res, next){
        advertisementQueries.getAd(req.params.id, (err, ad) => {
            if(err || ad == null){
                res.redirect(404, "/");
            } else {
                res.render("advertisement/edit", {ad});
            }
        });
    },

    update(req, res, next){
        advertisementQueries.updateAd(req.params.id, req.body, (err, ad) => {

            if(err || ad == null){
                res.redirect(404, `/advertisement/${req.params.id}/edit`);
            } else {
                res.redirect(`/advertisement/${ad.id}`);
            }
        });
    }
}