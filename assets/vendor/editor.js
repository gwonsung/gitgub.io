/**
 * http://usejsdoc.org/
 */
//사용
var Editor = {
		init : function(){
			this.beforeBind();
			this.bind();
			this.afterBind();
		},

		beforeBind : function(){

		},

		bind : function(){
			CKEDITOR.replace( 'editor1', {
	    		language : app.langCd,
	    		height : 200,
	    		autoGrow_minHeight : 200,
	    		autoGrow_maxHeight : 800

	    	});

	    	$('#_save').on('click', function(){
	    		var charArray = ['가','나','다','라','마','바','사','아','자','차','카','타','파','하','김','이','박','정','백','강','오','윤', '하', '봉'];
	    		for(var i=0; i < 5; i++){
	    			WksUtil.ajax({
	            		url : app.contextPath + '/service/sample/selectEmployeeList?userName=JUNG',
	            		data : {userId : 'jgwonsung'},
	            		method : 'GET',
	            		dataType : 'json',
	            		success : function(data, status){
	            			console.log(data);
	            		}
	            	});
	    		}
	    	});
		},

		afterBind : function(){

		},

		fn : {

		}
};
