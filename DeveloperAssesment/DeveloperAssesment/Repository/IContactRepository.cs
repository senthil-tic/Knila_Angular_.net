using DeveloperAssesment.Models;

namespace DeveloperAssesment.Repository
{
    public interface IContactRepository
    {
        Task<IEnumerable<Contact>> GetContactsAsync();
        Task<Contact> GetContactByIdAsync(int id);
        Task<Contact> CreateContactAsync(Contact contact);
        Task<Contact> UpdateContactAsync(Contact contact);
        Task<bool> DeleteContactAsync(int id);
    }
}
