using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ePollServer.Models
{
    public class Question
    {
        [Key]
        public int QuestionID { get; set; }

        [Column(TypeName = "nvarchar(250)")]
        public string Title { get; set; }

        public List<Answer> Answers { get; set; }
    
    }
}
