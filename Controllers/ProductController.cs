using Google.Api.Gax.Grpc;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Text;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860


namespace ProductApi.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        private IProductService _productService;

        public ProductController(IProductService productService)
        {
            _productService = productService;
        }



        // GET: api/<ProducController>
        [HttpGet]
        public IEnumerable<Product> Get() => _productService.GetProducts();

        // GET api/<ProducController>/5
        [HttpGet("{id}")]
        public Product Get(int id) => _productService.GetProduct(id);

        // POST api/<ProducController>
        [HttpPost]
        public void Post([FromBody] Product value)
        {
            _productService.UpdateProduct(value);
        }

        // PUT api/<ProducController>/5
        [HttpPut]
        public void Put([FromBody] Product value)
        {
            _productService.CreateProduct(value);
        }

        [HttpPut("img")]
        public IActionResult ImgUpload()
        {
            var img = Request.Form.Files[0];

            Console.WriteLine("===================>Fayl; Saqlandi");

            if(!ModelState.IsValid)
            {
                ModelState.Values.ToList().ForEach(x => Console.WriteLine($"=============> {x.Errors[0].ErrorMessage}"));
            }

            string fileName = Path.Combine(Guid.NewGuid().ToString() + img.FileName);

            var file = new FileStream(
                Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", fileName),
                FileMode.Create);

            img.CopyTo(file);
            return Ok(new { fileName });
        }

        [HttpGet("imgexist/{name}")]
        public IActionResult IsImgExist(string name)
        {
            return Ok(new { exist = System.IO.File.Exists(Path.Combine(Directory.GetCurrentDirectory(), "wwwroot", name)) });
        }//{ exist: true}

        // DELETE api/<ProducController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            _productService.DeleteProduct(id);
        }
    }
}

