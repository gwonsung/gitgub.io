var Autocomplete = {
	init : function(){
		this.beforeBind();
		this.bind();
		this.afterBind();
	},

	beforeBind : function(){

	},

	bind : function(){
		WksUtil.autocomplete.create('#autocomplete1', $.extend({}, WksUtil.autocomplete.defOpt, {maxSelection: 1}));
		WksUtil.autocomplete.create('#autocomplete2');
		WksUtil.autocomplete.create('#autocomplete3', $.extend({}, WksUtil.autocomplete.defOpt, {
			allowFreeEntries: true,
			renderer: function (repo) {
			    return repo.text;
			},
	        selectionRenderer: function(repo) {
	        	return repo.text;
		    }
		}));
		WksUtil.autocomplete.suggestCreate('#autocomplete4', app.contextPath + '/service/sample/selectSuggestList', 'sample-selectSuggestList');

		$('#autocomplete3-result').click(function(){
			var data = WksUtil.autocomplete.getObject('#autocomplete3').getSelection();
			$('#autocomplete-result-view').text(JSON.stringify(data));

		});
	},

	afterBind : function(){

	},

	fn : {

	}
};
