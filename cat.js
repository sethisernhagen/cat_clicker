$(function(){
	
	var model = [
		{
			id: 0,
			name: 'fred',
			img: 'fred.jpg',
			clicks: 0

		}, {
			id: 1,
			name: 'jim',
			img: 'jim.jpg',
			clicks: 0
		}, {
			id: 2,
			name: 'steve',
			img: 'steve.jpg',
			clicks: 0
		}, {
			id: 3,
			name: 'dave',
			img: 'dave.jpg',
			clicks: 0
		}, {
			id: 4,
			name: 'larry',
			img: 'larry.jpg',
			clicks: 0
		}, {
			id: 5,
			name: 'wayne',
			img: 'wayne.jpg',
			clicks: 0
		}
	];


	var controller = {
		init: function() {
			view.init();
		},
		getCats: function() {
			return model;
		},
		getCat: function(id){

			for(i=0; i<model.length; i++){
				if(model[i].id === id){
					return model[i];
				}
			}
		}
	};

	var view = {

		init: function() {

            // grab elements and html for using in the render function
            this.$catList = $('#cat-list');
            this.catListTemplate = $('script[data-template="cat-list"]').html();
            this.$catDetails = $('#cat-details');
            this.catTemplate = $('script[data-template="cat-details"]').html();
            this.currentCat = undefined;

            // Delegated event to listen for removal clicks
            this.$catList.on('click', '.cat', function(e) {
                // var cat = $(this).parents('.cat').data();

            	view.currentCat = controller.getCat($(this).data().id);
                view.showCat(view.currentCat);
                return false;
            });

            this.$catDetails.on('click', 'img', function(e) {

            	view.currentCat.clicks++;

            	view.showCat(view.currentCat);

            	return false;
            });

            this.render();
        },

        render: function() {
            // Cache vars for use in forEach() callback (performance)
            var $catList = this.$catList,
                catListTemplate = this.catListTemplate;

            // Clear and render
            $catList.html('');
            controller.getCats().forEach(function(cat) {
                // Replace template markers with data
                // var thisTemplate = catTemplate.replace(/{{id}}/g, cat.name);
                var thisTemplate = catListTemplate.replace(/{{id}}/g, cat.id);
                thisTemplate = thisTemplate.replace(/{{name}}/g, cat.name);
                $catList.append(thisTemplate);
            });
        },

        showCat: function(cat) {
        	var $catDetails = this.$catDetails,
        		catTemplate = this.catTemplate,
        		thisTemplate = catTemplate.replace(/{{name}}/g, cat.name);

    		thisTemplate = thisTemplate.replace(/{{img}}/g, cat.img);
    		thisTemplate = thisTemplate.replace(/{{clicks}}/g, cat.clicks);
    		thisTemplate = thisTemplate.replace(/{{id}}/g, cat.id);


    		// Clear and render
            $catDetails.html('');
        	$catDetails.append(thisTemplate);

        }
	};

	controller.init();

}());