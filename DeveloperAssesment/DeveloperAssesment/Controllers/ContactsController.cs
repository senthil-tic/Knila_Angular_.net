using DeveloperAssesment.Data;
using DeveloperAssesment.Models;
using DeveloperAssesment.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

namespace DeveloperAssesment.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ContactsController : ControllerBase
    {
        private readonly ApplicationDbContext _context;
        private readonly IContactRepository _contactRepository;
        private readonly ILogger<ContactsController> _logger;
        public ContactsController(ApplicationDbContext context, ILogger<ContactsController> logger, IContactRepository contactRepository)
        {
            _context = context;
            _contactRepository = contactRepository;
            _logger = logger;
        }



        [HttpGet]
        public async Task<IActionResult> GetContacts()
        {
            try
            {
                var contacts = await _contactRepository.GetContactsAsync();
                return Ok(contacts);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving contacts: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetContactById(int id)
        {
            try
            {
                var contact = await _contactRepository.GetContactByIdAsync(id);
                if (contact == null)
                {
                    return NotFound($"No contact found with ID {id}");
                }
                return Ok(contact);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error retrieving contact {id}: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }



        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateContact(int id, [FromBody] Contact contact)
        {
            try
            {
                if (id != contact.Id)
                {
                    return BadRequest("Mismatched Contact ID");
                }

                contact.UpdatedUser = GetUserName();
                contact.UpdatedDateTime = DateTime.Now;
                contact.Id = id;

                var updatedContact = await _contactRepository.UpdateContactAsync(contact);
                return Ok(updatedContact);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error updating contact {id}: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        [HttpPost]
        public async Task<IActionResult> CreateContact([FromBody] Contact contact)
        {
            try
            {
                if (contact == null)
                {
                    return BadRequest("Invalid contact data.");
                }
                contact.CreatedUser = GetUserName();
                contact.UpdatedUser = GetUserName();
                contact.CreatedDateTime = DateTime.Now;
                contact.UpdatedDateTime = DateTime.Now;
                contact.IsDeleted = false;

                var createdContact = await _contactRepository.CreateContactAsync(contact);
                return Ok(createdContact);
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error creating contact: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }



        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            try
            {
                var isDeleted = await _contactRepository.DeleteContactAsync(id);
                if (!isDeleted)
                {
                    return NotFound($"No contact found with ID {id}");
                }

                return Ok($"Contact with ID {id} deleted successfully.");
            }
            catch (Exception ex)
            {
                _logger.LogError($"Error deleting contact {id}: {ex.Message}");
                return StatusCode(500, "Internal Server Error");
            }
        }


        private string GetUserName()
        {
            var username = User.FindFirst(ClaimTypes.Name)?.Value;

            return username ?? string.Empty;

        }
    }
}
