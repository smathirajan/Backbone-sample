// Create View
var CountryView = Backbone.View.extend({
  
  tagName: 'div',
  
  className: 'country-view',
  
  template: _.template(`<ul class='list-group'>
                          <li class='list-group-item'>
                            <div class='display-inline'> Country Name</div> -- 
                           <div class='display-inline'><%= name %></div>
                          </li>
                        </ul>`),
  
  initialize: function(model){
    this.model = model.model;
  },
  
  render: function(){
    var name = this.model.get('name');
    this.$el.html(this.template({
      name: name
    }));
    return this;
  }
})

// Create Model
var CountryModel = Backbone.Model.extend({
  defaults:{
      name: "",
      alpha2Code : "",
      alpha3Code: ""
    }
});


//Create Collection
// which fetches the countries list
var CountryCollection = Backbone.Collection.extend({
  
 
  url: 'https://restcountries.eu/rest/v2/all',
  
  model: CountryModel,
  
  parse: function(obj){
    return {
      name: obj.name,
      code: obj.alpha2Code
    }
  }
});

var countries = new CountryCollection();
// fetch, will invoke the url
// and gives the deferred
var def = countries.fetch();

if(def){
// once the deferred is resolved.
// Ajax request is completed,
// This call back will be invoked.
def.done(function(response){
  response.forEach(function(model){
    // Adding models into Collection, countries- a collection
    countries.add(model);
  })
  
  countries.forEach(function(model){
    // Create the view by iterating the models in the collection
    // and pass the model to the view
    if(model && model.get('name')){
      var country = new CountryView({model: model});
      $(".container").append(country.render().el)
    }
  })
})
}



