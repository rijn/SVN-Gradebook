module.exports =
`
    <div class="ui container" style="padding:2em 0">
        <div class="ui menu">
            <a class="item"><b>Gradebook</b></a>
            <div class="item">A more friendly gradebook for CS 225 / 233 / 241</div>
            <div class="right menu">
                <div class="item"><i class="user icon"></i>[:=netid:]</span></div>
                <a class="item" href="https://github.com/rijn/SVN-Gradebook">Star me on Github</a>
            </div>
        </div>
    </div>
    <div class="ui stackable container">
        <div class="ui stackable grid">
            <div class="four wide column">
                <div class="ui vertical pointing menu" id="courseList">
                    <a class="active item">
			    Home
			  </a>
    [: for (var i in func.uiData.courseList) { :]
    	<a class="item">[:=i:]</a>
    [:}:]
                </div>
            </div>
            <div class="twelve wide column">
                <div class="ui segment">
[: if(func.uiData.displayPage == 'Home') { :]
	<button class="ui primary button">Update all repository</button>
<div class="ui segment">
    [: for (var i = 0; i < func.uiData.status.length && i < 10; i++) { :]
    	<p>[:=func.uiData.status[i]:]</p>
    [:}:]
</div>
[:}:]
                </div>
            </div>
        </div>
    </div>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/semantic-ui/2.2.4/semantic.min.js" charset="utf-8"></script>
`