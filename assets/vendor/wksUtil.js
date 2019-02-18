/**
 *
 */
	/**
	 * jQuery 기본 설정을 한다.
	 */
	$.ajaxSetup({
		beforeSend : function(jqXHR, settings){
			jqXHR.setRequestHeader("wksAjax","true"); //서버에서 ajax통신중 발생하는 오류를 인식하기 위해

			var url = settings.url;
			var data = settings.data;

			if(settings.url.indexOf('?') > -1){
				url = settings.url.split('?')[0];

				if(!data){
					data = settings.url.split('?')[1].split('_=')[0];
				}
			}

			if(!WksUtil.http.sentMapMng.put(url, data)) return false;
		},

		complete : function(jqXHR, textStatus){
			var url = this.url;
			var data = this.data;
			if(this.url.indexOf('?') > -1){
				url = this.url.split('?')[0];

				if(!data){
					data = this.url.split('?')[1].split('_=')[0];
				}
			}
			WksUtil.http.sentMapMng.remove(url, data);
		},
		statusCode : {
			403 : function(agument1){
				alert('권한이 없어 로그인 페이지로 이동 합니다.');
				window.location.reload();
			},
			401 : function(){
				alert('권한이 없어 로그인 페이지로 이동 합니다.');
				window.location.reload();
			},
			500 : function(){
				alert('시스템 오류가 발생 하였습니다.');
			}
		}
	});

	/**
	 * 스페이스 유틸 오브젝트
	 */
	var WksUtil = {
		/**
		 * 비동기 통신 함수 정의
		 */
		http : {
			ajax : function(options){
				this.defaultOptions = {
						cache : false,
						method : 'POST'
				}

				$.ajax($.extend({}, this.defaultOptions, options));
			},

			sentMapMng : {
				map : {},

				put : function(key, data){
					if(this.map[key]){
						if($.isArray(this.map[key])){
							var isDifferent = true;

							$.each(this.map[key], function(){
								if(_.isEqual(this, data)){
									isDifferent = false;
									return false;
								}
							});

							if(isDifferent){
								this.map[key].push(data);
								return true;
							}else{
								return false;
							}
						}else{
							if(_.isEqual(this.map[key], data)) return false;
							else{
								var array = new Array();
								array.push(this.map[key]);
								array.push(data);
								this.map[key] = array;
								return true;
							}
						}
					}else{
						this.map[key] = data;
						return true;
					}
				},

				get : function(key){
					if(this.map[key]) return this.map[key];
					else null;
				},

				remove : function(key, data){
					var that = this;
					if(this.map[key]){
						if($.isArray(this.map[key])){
							$.each(this.map[key], function(idx){
								if(_.isEqual(this, data)){
									delete that.map[key][idx];
									return false;
								}
							});
							return true;
						}else{
							delete this.map[key];
							return true;
						}
					}

					return false;
				}
			}
		},

		/**
		 * 자동 완성 관련 함수 정의
		 */
		autocomplete : {
			hisMap : {},
			defOpt : {
				allowFreeEntries: false,	// 등록되어 있지 않은 항목도 추가 하게 할 것인지 여부 default는 true
				data: autoCompt_data,	// remote URL
				allowDuplicates: false,	// 중복 등록 허용 여부 default는 false
				autoSelect: true,	// 자동 선택 여부(false로 할 경우 결과 목록에서 직접 선택해야 추가 할 수 있다.) default는 true
				beforeSend: function(xhr, settings) {return true;},	// remote 호출 시 호출 하기전 호출되는 함수
				dataUrlParams : {},	//검색어 이외에 추가 파라미터를 정의하는 곳
				disabled: false,	// 비활성화 여부
				//disabledField: 'disabled',	// 제안 데이터 요소중 비활성화를 판단 할 수 있는 필드를 지정 예) [{id : 1, disabled : true}, {id : 2, disabled : false}] --> 2는 선택 가능 1은 선택 불가능
				editable: true,	// 검색어를 입력 할 수 있게 할지 여부 false일 경우 selectbox처럼만 사용 가능 default는 true
		        valueField: 'id',	// 키 요소 명
		        displayField: 'text',	// 표시 할 요소 명
		        expanded : false,	// init시 drop menu를 펼치지 여부 default는 false
		        expandOnFocus: false,	// focus시 drop menu를 펼칠지 여부 default는 false
		        //groupBy: 'continentName',	group하여 보여줄 경우 사용 group 요소명을 입력 default는 null
		        hideTrigger: true,	// 오른쪽 끝에 selectbox 처럼 있는 화살표 버튼을 숨길지 여부 default는 false
		        highlight: false,	// 검색어와 매칭되는 부분을 제안 항목들에 표시 할지 여부 default는 true
		        //infoMsgCls: 'custom', 	// 정보를 표시하는 영역에 설정할 클래스명. 이영역은 유효성 체크나 안내 멘트를 입력 한다.
		        //inputCfg: {"ng-model":"customer.city"},	// input 항목에 attribute를 추가 한다.
		        //matchCase: true,	// 대소문자를 구별하여 매칭 할지 여부 default는 false
		        placeholder : '사원명 또는 (부서명)',
		        noSuggestionText : '검색 결과가 없습니다.',
		        //invalidCls: 'custom'	// invalid 할때 추가할 클래스 명
		        //required : true,	// validation 체크 사용 여부
		        resultAsString : true,	// 제안 목록에서 구분자를 표시 할지 여부(텍스트에 구분자 캐릭터가 있을 경우 focus를 잃는 문제가 발생)
		        resultAsStringDelimiter : ';',	// 입력 구분자
		        typeDelay : 250,	// 호출 딜레이
		        useTabKey: true,	// 탭키 사용 여부
		        renderer: function (repo) {
				      //if (repo.loading) return repo.text;
		        	if(repo.typeCd == '3') repo.profileImg = '../../resources/common/img/avatars/uifaces8.jpg';
		        	else if(repo.typeCd == '2') repo.profileImg = '../../resources/common/img/avatars/team1.jpg';

				      var markup = '<div class="media">' + '<div class="user-avatar mr-2"><img src="' + repo.profileImg + '" /></div>' + '<div class="media-body">' + '<h6 class="my-0">' + repo.fullName + '</h6>';
				      markup += '</div></div>';

				      return markup;
				},
		        selectionRenderer: function(repo) {
		        	return '<div class="user-avatar user-avatar-xs mr-2"><img src="' + repo.profileImg + '" /></div>' + repo.text;
			    }
			},

			create : function(selector, opt){
				if(!opt) opt = this.defOpt;

				var Obj;
				switch ($.type(selector)) {
				case 'string':
				case 'object':
					Obj = $(selector).magicSuggest(opt);

					var key = new Date().getTime() + Math.round(100*Math.random());
					$(selector).data('magicSuggestUniqueKey', key);
					this.hisMap[key] = Obj;
					break;
				case 'array':
					Obj = new Array();
					for(var i=0; i < selector.length; i++){
						var key = new Date().getTime() + Math.round(100*Math.random());
						var $obj = $(selector[i]);
						$obj.data('magicSuggestUniqueKey', key);
						this.hisMap[key] = $obj.magicSuggest(opt);
						Obj.push(this.hisMap[key]);
					}
					break;
				default:
					break;
				}

				return Obj;
			},

			getObject : function(selector){
				var key = $(selector).data('magicSuggestUniqueKey');

				if(this.hisMap[key]) return this.hisMap[key];
				else return null;
			},

			/**
			 * magic suggest 생성 공통 함수
			 * @param selector jQuery selector 문자열
			 * @param url 호출 할 URL
			 * @param dataKey 서버에서 받아온 데이터를 캐쉬 하기위한 캐쉬 명
			 */
			suggestCreate : function(selector, url, dataKey){
				if(!url || !selector || !dataKey){
					alert('suggestCreate func is agument required!!');
					return;
				}

				var remoteUrl = url;
				var wildcard = '%QUERY';
				if(url.indexOf('?') > -1) remoteUrl = remoteUrl + '&searchWord='+wildcard;
				else remoteUrl = remoteUrl + '?searchWord='+wildcard;

				var searchs = new Bloodhound({
		  		  datumTokenizer: Bloodhound.tokenizers.whitespace,
		  		  queryTokenizer: Bloodhound.tokenizers.whitespace,
		  		  local: ['마이스페이스','기업포털 구축','그룹웨어 운영','스페이스 구축','업무보고','월이슈공유회의','인수인계'
		  			]
		  		});

				$(selector).typeahead({
					highlight : true,
					classNames: {
						 menu : 'tt-dropdown-menu'
					  }
				}, {
				  name: dataKey,
				  limit : 2000,
				  source: searchs
				});
			}
		},

		/**
		 * 날짜 선택 컴포넌트 관련 함수 정의
		 */
		datepicker : {
			create : function(selector, opt){
				var defOpt = {
						locale : app.langCd,
						dateFormat : "Y-m-d"
				};

				$(selector).flatpickr($.extend({},defOpt, opt));
			}
		},

		tree : {
			createTreeView : function(selector, option){
				var defOpt = {
						collapseIcon : 'fas fa-caret-down',
						enableLinks : false,
						expandIcon : 'fas fa-caret-right',
						levels : 1,
						multiSelect : false,
						onhoverColor : '#F5F5F5',
						highlightSearchResults : true,
						searchResultBackColor : '#FFFFFF',
						searchResultColor : '#EA6759',
						highlightSelected : true,
						selectedBackColor : '#428bca',
						selectedColor : '#FFFFFF',
						showBorder : true,
						showCheckbox : true,
						showIcon : false,
						showTags : false,
						checkedIcon : 'far fa-check-square',
						uncheckedIcon : 'far fa-square'
				};

				return $(selector).treeview($.extend(defOpt, option));
			}
		},

		/**
		 * UI 관련 함수 정의
		 */
		UI : {
			init : function(){
				this.tooltipInit();
				this.popoverInit();
			},

			tooltipInit : function(){
				$('[data-toggle="tooltip"]').tooltip();
			},

			popoverInit : function(){
				$('[data-toggle="popover"]').popover();
			}
		}

	};
