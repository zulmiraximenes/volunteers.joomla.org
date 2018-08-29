/* jce - 2.6.32 | 2018-08-15 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2018 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
WFAggregator.add("vimeo",{params:{width:480,height:480,embed:!0},props:{color:"",autoplay:0,loop:0,portrait:0,title:0,byline:0,fullscreen:1},setup:function(){$("#vimeo_embed").toggle(this.params.embed);$.each(this.params,function(k,v){$("#vimeo_"+k).val(v).filter(":checkbox, :radio").prop("checked",!!v)})},getTitle:function(){return this.title||this.name},getType:function(){return $("#vimeo_embed").is(":checked")?"flash":"iframe"},isSupported:function(v){return"object"==typeof v&&(v=v.src||v.data||""),!!/vimeo(.+)?\/(.+)/.test(v)&&(!/\/external\//.test(v)&&"vimeo")},getValues:function(src){var self=this,data={},args={},type=this.getType(),id="";if(src.indexOf("=")!==-1&&$.extend(args,Wf.String.query(src)),$("input, select","#vimeo_options").not("#vimeo_embed").each(function(){var k=$(this).attr("id"),v=$(this).val();if(k=k.substr(k.indexOf("_")+1),$(this).is(":checkbox")&&(v=$(this).is(":checked")?1:0),self.props[k]!==v&&""!==v){switch(k){case"color":"#"==v.charAt(0)&&(v=v.substr(1));break;case"portrait":case"title":case"byline":"flash"==type&&(k="show_"+k)}args[k]=v}}),args.clip_id)id=args.clip_id;else{var s=/vimeo\.com\/(\w+\/)?(\w+\/)?([0-9]+)/.exec(src);s&&"array"===$.type(s)&&(id=s.pop())}src="flash"==type?"https://vimeo.com/moogaloop.swf?clip_id="+id:"https://player.vimeo.com/video/"+id;var query=$.param(args);return query&&(src=src+(/\?/.test(src)?"&":"?")+query),data.src=src,"iframe"==type?($.extend(data,{frameborder:0}),0!==args.fullscreen&&$.extend(data,{allowfullscreen:!0})):$.extend(!0,data,{param:{allowfullscreen:!0,wmode:"opaque"}}),data},setValues:function(data){var self=this,src=data.src||data.data||"",id="";if(!src)return data;var query=Wf.String.query(src);if($.extend(data,query),src=src.replace(/&amp;/g,"&"),/moogaloop.swf/.test(src))data.embed=!0,id=query.clip_id,delete query.clip_id,delete data.clip_id,$.each(["portrait","title","byline"],function(i,s){delete data["show_"+s]});else{var s=/vimeo\.com\/(\w+\/)?(\w+\/)?([0-9]+)/.exec(src);s&&"array"===$.type(s)&&(id=s.pop())}return $.each(["portrait","title","byline","autoplay","loop"],function(i,s){var v=query[s]||0;data[s]=v}),$.each(query,function(k,v){"undefined"==typeof self.props[k]&&$("#vimeo_options table").append('<tr><td><label for="vimeo_'+k+'">'+k+'</label><input type="text" id="vimeo_'+k+'" value="'+v+'" /></td></tr>')}),src="https://vimeo.com/"+id,data.color&&"#"!=data.color.charAt(0)&&(data.color="#"+data.color),data.src=src,data},getAttributes:function(src){var args={},data=this.setValues({src:src})||{};return $.each(data,function(k,v){"src"!=k&&(args["vimeo_"+k]=v)}),$.extend(args,{src:data.src||src,width:this.params.width,height:this.params.height}),args},setAttributes:function(){},onSelectFile:function(){},onInsert:function(){}});