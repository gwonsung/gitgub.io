/**
 * http://usejsdoc.org/
 */
//사용
var Tree = {
		init : function(){
			this.beforeBind();
			this.bind();
			this.afterBind();
		},

		beforeBind : function(){
		},

		bind : function(){
			// tree1
			var tree1 = WksUtil.tree.createTreeView('#tree1', {data : tree_data1});

			// 검색 필드
			$('#tree1-searchWord').on('keyup', function(){
				$('#tree1').treeview('search', [ $(this).val(), { ignoreCase: false, exactMatch: false } ]);
			});
			// 선택
			$('#tree1-checked').on('click', function(){
				var searchList = $('#tree1').treeview('search', [ $('#tree1-searchWord').val(), { ignoreCase: false, exactMatch: false } ]);
				console.log(searchList);
				$.each(searchList, function(){
					$('#tree1').treeview('checkNode', [ this.nodeId, { silent: true } ]);
				});
			});
			// 선택 초기화
			$('#tree1-uncheckAll').on('click', function(){
				$('#tree1').treeview('uncheckAll', { silent: true });
			});

			// tree2
			$('#tree2').jstree({
				plugins : ['search', 'contextmenu', 'search'],
				core : {
					data : tree_data2
				},

				contextmenu : {
					items : function(node){
						return {
							'move_space' : {
								label : '스페이스 이동',
								action : function(obj){
									alert(1);
								}
							},
							'view_task' : {
								label : 'Task 조회',
								action : function(obj){
									alert(1);
								}
							},
							'view_meeting' : {
								label : '회의록 조회',
								action : function(obj){
									alert(1);
								}
							},
							'view_email' : {
								label : '이메일 조회',
								action : function(obj){
									alert(1);
								}
							},
							'view_app' : {
								label : '결재 조회',
								action : function(obj){
									alert(1);
								}
							}
						}
					}
				}
			});

			//WksUtil.autocomplete.suggestCreate('#tree2-searchWord', app.contextPath + '/service/sample/selectWksSearch', 'sample-selectWksSearch');

			$('#tree2-btn-search').click(function(){
				var searchWord = $('#tree2-searchWord').typeahead('val');
				WksUtil.http.ajax({
					url : app.contextPath + '/service/sample/selectWksSearch',
					data : {searchWord : searchWord},
					success : function(data, status){
						if(data && data.length > 0){
							var $tree = $('#tree2').jstree(true);

							for(var i = 0; i < data.length; i++){
								if(!$tree.get_node(data[i].id)){
									var paths = data[i].href.split('/').splice(1).reverse();
									var nodeId = paths.pop();

									var calFunc = function(id){
										if(!$tree.is_loaded(id)){
											$tree.load_node(id, function(node, status){
												if(paths.length > 0) calFunc(paths.pop());
												else{
													$tree.search(searchWord);
													$('#'+id+'_anchor').focus();
												}
											});
										}else{
											$tree.search(searchWord);
											$('#'+id+'_anchor').focus();
										}
									};

									calFunc(nodeId);
								}else{
									$tree.search(searchWord);
									$('#'+data[i].id+'_anchor').focus();
								}
							}
						}
					}
				})
			});
		},

		afterBind : function(){

		},

		fn : {
		}
};
