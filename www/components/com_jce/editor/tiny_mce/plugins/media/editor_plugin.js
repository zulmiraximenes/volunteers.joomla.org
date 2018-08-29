/* jce - 2.6.32 | 2018-08-15 | https://www.joomlacontenteditor.net | Copyright (C) 2006 - 2018 Ryan Demmer. All rights reserved | GNU/GPL Version 2 or later - http://www.gnu.org/licenses/gpl-2.0.html */
!function(){var each=tinymce.each,extend=tinymce.extend,JSON=tinymce.util.JSON,Node=(tinymce.dom.Event,tinymce.html.Node),Styles=new tinymce.html.Styles,mediaTypes={flash:{classid:"CLSID:D27CDB6E-AE6D-11CF-96B8-444553540000",type:"application/x-shockwave-flash",codebase:"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version=10,1,53,64"},shockwave:{classid:"CLSID:166B1BCA-3F9C-11CF-8075-444553540000",type:"application/x-director",codebase:"http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version=10,2,0,023"},windowsmedia:{classid:"CLSID:6BF52A52-394A-11D3-B153-00C04F79FAA6",type:"application/x-mplayer2",codebase:"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version=10,00,00,3646"},quicktime:{classid:"CLSID:02BF25D5-8C17-4B23-BC80-D3488ABDDC6B",type:"video/quicktime",codebase:"http://www.apple.com/qtactivex/qtplugin.cab#version=7,3,0,0"},divx:{classid:"CLSID:67DABFBF-D0AB-41FA-9C46-CC0F21721616",type:"video/divx",codebase:"http://go.divx.com/plugin/DivXBrowserPlugin.cab"},realmedia:{classid:"CLSID:CFCDAA03-8BE4-11CF-B84B-0020AFBBCCFA",type:"audio/x-pn-realaudio-plugin"},java:{classid:"CLSID:8AD9C840-044E-11D1-B3E9-00805F499D93",type:"application/x-java-applet",codebase:"http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version=1,5,0,0"},silverlight:{classid:"CLSID:DFEAF541-F3E1-4C24-ACAC-99C30715084A",type:"application/x-silverlight-2"},video:{type:"video/mpeg"},audio:{type:"audio/mpeg"},iframe:{}};tinymce.create("tinymce.plugins.MediaPlugin",{init:function(ed,url){function isMediaNode(n){return n&&(ed.dom.is(n,".mce-item-media")||null!==ed.dom.getParent(n,".mce-item-media"))}function isMediaClass(cls){return cls&&/mce-item-(media|flash|shockwave|windowsmedia|quicktime|realmedia|divx|silverlight|audio|video|generic|iframe)/.test(cls)}var self=this,lookup={},cbase={flash:{codebase:"http://download.macromedia.com/pub/shockwave/cabs/flash/swflash.cab#version="+ed.getParam("media_version_flash","10,1,53,64")},shockwave:{codebase:"http://download.macromedia.com/pub/shockwave/cabs/director/sw.cab#version="+ed.getParam("media_version_shockwave","10,2,0,023")},windowsmedia:{codebase:"http://activex.microsoft.com/activex/controls/mplayer/en/nsmp2inf.cab#Version="+ed.getParam("media_version_windowsmedia","10,00,00,3646")},quicktime:{codebase:"http://www.apple.com/qtactivex/qtplugin.cab#version="+ed.getParam("media_version_quicktime","7,3,0,0")},java:{codebase:"http://java.sun.com/products/plugin/autodl/jinstall-1_5_0-windows-i586.cab#Version="+ed.getParam("media_version_java","1,5,0,0")}};each(cbase,function(v,k){extend(mediaTypes[k],v)}),this.mimes={},function(data){var i,y,ext,items=data.split(/,/);for(i=0;i<items.length;i+=2)for(ext=items[i+1].split(/ /),y=0;y<ext.length;y++)self.mimes[ext[y]]=items[i]}("application/x-director,dcr,video/divx,divx,application/pdf,pdf,application/x-shockwave-flash,swf swfl,audio/mpeg,mpga mpega mp2 mp3,audio/ogg,ogg spx oga,audio/x-wav,wav,video/mpeg,mpeg mpg mpe,video/mp4,mp4 m4v,video/ogg,ogg ogv,video/webm,webm,video/quicktime,qt mov,video/x-flv,flv,video/vnd.rn-realvideo,rv","NaNvideo/x-matroska,mkv"),self.editor=ed,self.url=url;each(mediaTypes,function(v,k){v.name=k,v.classid&&(lookup[v.classid]=v),v.type&&(lookup[v.type]=v),lookup["mce-item-"+k]=v,lookup[k.toLowerCase()]=v}),self.lookup=lookup,ed.onPreInit.add(function(){var invalid=ed.settings.invalid_elements;"html4"===ed.settings.schema&&(ed.schema.addValidElements("iframe[longdesc|name|src|frameborder|marginwidth|marginheight|scrolling|align|width|height|allowfullscreen|seamless|*]"),ed.schema.addValidElements("video[src|autobuffer|autoplay|loop|controls|width|height|poster|*],audio[src|autobuffer|autoplay|loop|controls|*],source[src|type|media|*],embed[src|type|width|height|*]")),ed.schema.addCustomElements("mce-comment"),invalid=tinymce.explode(invalid,","),ed.parser.addNodeFilter("object,embed,video,audio,script,iframe",function(nodes){for(var node,i=nodes.length;i--;)node=nodes[i],tinymce.inArray(invalid,node.name)==-1?self.toImage(node):node.remove()}),ed.serializer.addNodeFilter("img,span",function(nodes,name,args){for(var node,cls,i=nodes.length;i--;)node=nodes[i],cls=node.attr("class")||"",isMediaClass(cls)&&self.restoreElement(node,args)})}),ed.onInit.add(function(){ed.theme&&ed.theme.onResolveName&&ed.theme.onResolveName.add(function(theme,o){var n=o.node;if(n){var cls=ed.dom.getAttrib(n,"class","");cls.indexOf("mce-item-media")!==-1&&(o.name="media"),cls.indexOf("mce-item-iframe")!==-1&&(o.name="iframe")}}),ed.settings.compress.css||ed.dom.loadCSS(url+"/css/content.css")}),ed.onNodeChange.add(function(ed,cm,n){var s=isMediaNode(n);if(ed.dom.removeClass(ed.dom.select(".mce-item-selected.mce-item-preview"),"mce-item-selected"),s){var p=ed.dom.getParent(n,".mce-item-media.mce-item-preview");ed.dom.addClass(p,"mce-item-selected"),ed.selection.select(p)}}),ed.onBeforeSetContent.add(function(ed,o){var h=o.content;h=h.replace(/<(audio|embed|object|video|iframe)([^>]*?)>([\w\W]+?)<\/\1>/gi,function(a,b,c,d){return d=d.replace(/<!(--)?(<!)?\[if([^\]]+)\](>--)?>/gi,"<![if$3]>"),d=d.replace(/<!\[if([^\]]+)\]>/gi,function(a,b){return'<mce-comment data-comment-condition="[if'+b+']">'}),d=d.replace(/<!(--<!)?\[endif\](--)?>/gi,"</mce-comment>"),"<"+b+c+">"+d+"</"+b+">"}),o.content=h}),ed.onPostProcess.add(function(ed,o){o.get&&(o.content=o.content.replace(/<mce-comment data-comment-condition="([^>]+)">/gi,"<!--$1>"),o.content=o.content.replace(/<\/mce-comment>/g,"<![endif]-->"))})},getInfo:function(){return{longname:"Media",author:"Ryan Demmer",authorurl:"http://www.joomlacontenteditor.net",infourl:"http://www.joomlacontenteditor.net",version:"@@version@@"}},convertUrl:function(url,force_absolute){var self=this,ed=self.editor,settings=ed.settings,converter=settings.url_converter,scope=settings.url_converter_scope||self;if(!url)return url;var query="",n=url.indexOf("?");return n===-1&&(url=url.replace(/&amp;/g,"&"),n=url.indexOf("&")),n>0&&(query=url.substring(n+1,url.length),url=url.substr(0,n)),url=force_absolute?ed.documentBaseURI.toAbsolute(url):converter.call(scope,url,"src","object"),url+(query?"?"+query:"")},createTemplate:function(n,o){function is_child(n){return/^(audio|embed|object|video|iframe)$/.test(n.parent.name)}var nn,hc,cn,html,v,self=this,ed=this.editor;ed.dom;if(hc=n.firstChild,nn=n.name,o=o||{},/^(audio|embed|object|param|source|video|iframe)$/.test(nn)){var at=this.serializeAttributes(n);switch(nn){case"audio":case"embed":case"object":case"video":case"iframe":case"param":hc||is_child(n)?("undefined"==typeof o[nn]&&(o[nn]={}),extend(o[nn],at),o=o[nn]):extend(o,at);break;case"source":"undefined"==typeof o[nn]&&(o[nn]=[]),o[nn].push(at)}if(hc)for(cn=n.firstChild;cn;)self.createTemplate(cn,o),cn=cn.next}else if("mce-comment"==nn)if(v=n.attr("data-comment-condition")){if("undefined"==typeof o[nn]&&(o[nn]={}),extend(o[nn],{"data-comment-condition":v}),hc)for(cn=n.firstChild,o=o[nn];cn;)self.createTemplate(cn,o),cn=cn.next}else v=new tinymce.html.Serializer({inner:!0,validate:!1}).serialize(n),"undefined"==typeof o[nn]?o[nn]=[tinymce.trim(v)]:o[nn].push(tinymce.trim(v));else html="#text"==nn?n.value:(new tinymce.html.Serializer).serialize(n);return html&&("undefined"==typeof o.html&&(o.html=[]),o.html.push(html)),o},toImage:function(n){var type,name,styles,matches,placeholder,ed=this.editor,o={},data={},classid="";if(n.parent&&!/^(object|audio|video|embed|iframe)$/.test(n.parent.name)){if(placeholder="iframe"===n.name&&ed.getParam("media_live_embed")?new Node("span",1):new Node("img",1),"script"===n.name){if(n.firstChild&&(matches=/(JCEMediaObject|write(Flash|ShockWave|QuickTime|RealMedia|WindowsMedia|DivX))/i.exec(n.firstChild.value)),!matches)return;type=matches[1].toLowerCase(),data=JSON.parse(matches[2]),w=data.width,h=data.height,name="object"}else{name=n.name;var style=Styles.parse(n.attr("style")),w=n.attr("width")||style.width||"",h=n.attr("height")||style.height||"",type=n.attr("type");if(data=this.createTemplate(n),"embed"==name&&"application/x-shockwave-flash"==type&&(name="object",data.param={},each(["bgcolor","flashvars","wmode","allowfullscreen","allowscriptaccess","quality"],function(k){var v=n.attr(k);if(v){if("flashvars"==k)try{v=encodeURIComponent(v)}catch(e){}data.param[k]=v}delete data[k]})),each(["audio","embed","object","video","iframe"],function(el){each(n.getAll(el),function(node){node.remove()})}),n.attr("classid")&&(classid=n.attr("classid").toUpperCase()),"object"==name){if(!data.data){var param=data.param;param&&(data.data=param.src||param.url||param.movie||param.source)}}else!data.src&&data.source&&data.source.length>1&&(data.src=data.source[0].src);var lookup=this.lookup[classid]||this.lookup[type]||this.lookup[name]||{name:"generic"};type=lookup.name||type;var style=Styles.parse(n.attr("style"));each(["bgcolor","align","border","vspace","hspace"],function(na){var v=n.attr(na);if(v)switch(na){case"bgcolor":style["background-color"]=v;break;case"align":/^(left|right)$/.test(v)?style.float=v:style["vertical-align"]=v;break;case"vspace":style["margin-top"]=v,style["margin-bottom"]=v;break;case"hspace":style["margin-left"]=v,style["margin-right"]=v;break;default:style[na]=v}}),each(["id","lang","dir","tabindex","xml:lang","style","title"],function(at){placeholder.attr(at,n.attr(at))}),(styles=ed.dom.serializeStyle(style))&&placeholder.attr("style",styles)}o[name]=data;var classes=[];if(n.attr("class")&&(classes=n.attr("class").split(" ")),name=name.toLowerCase(),classes.push("mce-item-media mce-item-"+name.toLowerCase()),"span"===placeholder.name&&classes.push("mce-item-preview"),type&&name!==type.toLowerCase()&&classes.push("mce-item-"+type.split("/").pop().toLowerCase()),"audio"==name){var agent=navigator.userAgent.match(/(Opera|Chrome|Safari|Gecko)/);agent&&classes.push("mce-item-agent"+agent[0].toLowerCase())}if(placeholder.attr({width:w,height:h,class:classes.join(" "),"data-mce-json":JSON.serialize(o)}),"iframe"===name&&ed.getParam("media_live_embed")){var preview=new tinymce.html.Node(name,1),attrs=o.iframe;tinymce.extend(attrs,{src:n.attr("src"),allowfullscreen:n.attr("allowfullscreen"),width:n.attr("width")||w,height:n.attr("height")||h,frameborder:"0"}),preview.attr(attrs),placeholder.attr({contentEditable:"false"});var shim=new tinymce.html.Node("span",1);shim.attr("class","mce-item-shim"),placeholder.append(preview),placeholder.append(shim)}else placeholder.attr({src:"data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"});n.replace(placeholder)}},serializeAttributes:function(n){var k,v,ed=this.editor,self=this,attribs=(this.editor.dom,{});if("iframe"!=n||"param"!=n){var type=n.attr("type"),src=n.attr("src")||n.attr("data");if(!type&&src){var ext;/\.([a-z0-9]{2,4})/.test(src)&&(ext=/\.([a-z0-9]{2,4})/.exec(src),ext=ext[1]||""),ext&&(attribs.type=this.mimes[ext])}}if("param"==n.name){if(k=n.attr("name"),v=n.attr("value"),k&&""!=v&&"flashvars"==k)try{v=encodeURIComponent(v)}catch(e){}attribs[k]=v}else for(k in n.attributes.map)switch(v=n.attributes.map[k],k){case"poster":case"src":case"data":attribs[k]=self.convertUrl(v);break;case"autoplay":case"controls":case"loop":case"seamless":case"allowfullscreen":attribs[k]=k;break;case"frameborder":0==parseInt(v)&&"html5"===ed.settings.schema?attribs.seamless="seamless":attribs[k]=v;break;case"type":attribs[k]=v.replace(/"/g,"'");break;default:attribs[k]=v}if("embed"==n.name&&"object"==n.parent.name){var params=n.parent.getAll("param");params&&each(params,function(p){if(k=p.attr("name"),v=p.attr("value"),k&&""!=v&&"flashvars"==k)try{v=encodeURIComponent(v)}catch(e){}attribs[k]=v})}return attribs},createNodes:function(data,el){function createNode(o,el){each(o,function(v,k){var n,nn=el.name;if(tinymce.is(v,"object"))if(/(param|source)/.test(nn)&&/(audio|embed|object|video)/.test(k)&&(el=el.parent),"mce-comment"==k){var node=new Node("#comment",8);node.value=v["data-comment-condition"]+">",delete v["data-comment-condition"],el.append(node),createNode(v,el),node=new Node("#comment",8),node.value="<![endif]",el.append(node)}else if(v instanceof Array)each(v,function(s){tinymce.is(s,"string")?self.setAttribs(el,data,k,s):(node=new Node(k,1),"source"==k&&(node.shortEnded=!0),createNode(s,node),el.append(node))});else if("param"==k)for(n in v){var param=new Node(k,1);param.shortEnded=!0,self.setAttribs(param,data,n,v[n]),el.append(param)}else node=new Node(k,1),el.append(node),createNode(v,node);else if("#comment"==nn){var comment=new Node("#comment",8);comment.value=dom.decode(v),el.append(comment)}else self.setAttribs(el,data,k,v)})}var self=this,ed=this.editor,dom=ed.dom;return createNode(data,el),el},setAttribs:function(n,data,k,v){var ed=this.editor,dom=ed.dom,nn=n.name;if(null!=v&&"undefined"!=typeof v)if("param"==nn){switch(k){case"flashvars":try{v=decodeURIComponent(v)}catch(e){}break;case"src":case"movie":case"source":case"url":v=this.convertUrl(v)}n.attr("name",k),n.attr("value",v.toString())}else switch(k){case"width":case"height":v=data[k]||v,n.attr(k,v.toString());break;case"class":var cls=tinymce.explode(" ",n.attr("class"));tinymce.inArray(cls,v)==-1&&cls.push(tinymce.trim(v)),n.attr("class",tinymce.trim(cls.join(" ",v)));break;case"type":n.attr(k,v.replace(/(&(quot|apos);|")/g,"'"));break;case"flashvars":try{v=decodeURIComponent(v)}catch(e){}n.attr(k,v);break;case"src":case"data":case"source":n.attr(k,this.convertUrl(v));break;case"html":var html=new Node("#text",3);html.raw=!0,html.value=(n.value?n.value:"")+dom.decode(v),n.append(html);break;default:if(!k||"undefined"==typeof v)return;n.attr(k,v.toString())}},getMimeType:function(s){if(/\.([a-z0-9]{2,4})/.test(s)){var ext=s.substring(s.length,s.lastIndexOf(".")+1).toLowerCase();return this.mimes[ext]}var props,type,cl=s.match(/mce-item-(audio|video|flash|shockwave|windowsmedia|quicktime|realmedia|divx|pdf|silverlight|iframe)/);return cl&&(props=mediaTypes[cl[1]],props&&(type=props.type)),type},restoreElement:function(n,args){var props,v,ed=this.editor,data=(ed.dom,JSON.parse(n.attr("data-mce-json"))),name=this.getNodeName(n.attr("class")),parent=new Node(name,1),root=data[name],src=root.src||root.data||"",params=root.param||"";each(["width","height"],function(k){v=n.attr(k),v&&"audio"!=name&&(root[k]&&root[k]==v||(root[k]=v)),each(["object","embed","video"],function(s){root[s]&&!root[s][k]&&(root[s][k]=v)})}),each(["id","lang","dir","tabindex","xml:lang","style","title","class"],function(at){v=n.attr(at),"class"==at&&(v=tinymce.trim(v.replace(/\s?mce-item-([\w]+)/g,""))),v&&/[\w\d]+/.test(v)&&(root[at]=v)});var strict=ed.getParam("media_strict",!0)&&/mce-item-(flash|shockwave)/.test(n.attr("class"));if(root.type||(root.type=this.getMimeType(src)||this.getMimeType(n.attr("class"))),"object"==name)if(params=params||{},delete root.src,strict)root.data=src,/mce-item-flash/.test(n.attr("class"))&&extend(params,{movie:src}),delete params.src,delete root.embed,delete root.classid,delete root.codebase;else{var lookup=this.lookup[root.type]||this.lookup[name]||{name:"generic"};if("generic"!==lookup.name&&(root.embed||(root.embed={width:root.width,height:root.height,src:src,type:root.type}),delete root.data),root.classid||(root.classid=lookup.classid),root.codebase||(root.codebase=lookup.codebase),root.embed)for(k in params)/^(movie|source|url)$/.test(k)?root.embed.src=params[k]:root.embed[k]=params[k];if("generic"!==lookup.name){var k="src";/mce-item-windowsmedia/.test(n.attr("class"))&&(k="url"),/mce-item-silverlight/.test(n.attr("class"))&&(k="source"),params[k]=src}var props=this.lookup[name];extend(root,props),root.classid&&root.codebase&&delete root.type}else root.src&&root.source&&tinymce.is(root.source,"array")&&root.source.length&&(1==root.source.length?(root.source[0].src==root.src&&delete root.source,root.type||(root.type=this.getMimeType(root.src))):delete root.src);params&&(root.param=params),n.replace(this.createNodes(root,parent))},getNodeName:function(s){if(s=/mce-item-(audio|embed|object|video|iframe)/i.exec(s))return s[1].toLowerCase()}}),tinymce.PluginManager.add("media",tinymce.plugins.MediaPlugin)}();