<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Example extends CI_Controller {
	
	/**
	 * Index Page for this controller.
	 *
	 * Maps to the following URL
	 * 		http://example.com/index.php/welcome
	 *	- or -  
	 * 		http://example.com/index.php/welcome/index
	 *	- or -
	 * Since this controller is set as the default controller in 
	 * config/routes.php, it's displayed at http://example.com/
	 *
	 * So any other public methods not prefixed with an underscore will
	 * map to /index.php/welcome/<method_name>
	 * @see http://codeigniter.com/user_guide/general/urls.html
	 */
	 
	function __construct() 
	{
		parent::__construct();
		$this->load->helper('url');
	}
	
	public function index()
	{
		echo "<a href='example/simple_sidebar'>simple-sidebar</a><br />";
		echo "<a href='example/one_col_portfolio'>1-col-portfolio</a><br />";
	}
	
	public function simple_sidebar()
	{
		$this->load->view('simple-sidebar');
	}
	public function one_col_portfolio()
	{
		$this->load->view('1-col-portfolio');
	}
	public function merge()
	{
		$pages = array(
							'include/header',
							'sidebar',
							'topmenu',
							'include/footer'
							);
		$this->_render_pages($pages);
	}
	public function task()
	{
		$pages = array(
							'include/header',
							'sidebar',
							'topmenu',
							'task',
							'include/footer'
							);
		$this->_render_pages($pages);
	}
	private function _render_pages($views, $data = array(), $render = FALSE)
	{
		$content = '';
		
		foreach($views as $view) {
			$content .= $this->load->view($view, $data, $render);
		}

		if ($render)
		{
				return $content;
		}
	}	
}

/* End of file welcome.php */
/* Location: ./application/controllers/welcome.php */
