<!-- Sidebar -->
<div id="wrapper">
    <div id="sidebar-wrapper">
        <ul class="sidebar-nav">
            <li class="sidebar-brand"><a href="#">Navigate</a>
            </li>
            <li><a href="#">Inbox</a>
            </li>
            <li><a href="#">Tasks</a>
                <ul>
                    <li>New</li>
                    <li>Live</li>
                        <ul>
                            <li>Pending</li>
                            <li>Accepted</li>
                            <li>Declined</li>
                        </ul>
                    <li>Scheduled</li>
                    <li>Closed</li>
                </ul>
            </li>
            <li><a href="#">Market</a>
            </li>
            <li><a href="#">Setting</a>
            </li>
            <li><a href="#">Support</a>
            </li>
        </ul>
    </div>
</div>

<script>
$("#menu-toggle").click(function(e) {
    e.preventDefault();
    $("#wrapper").toggleClass("active");
});
</script>
