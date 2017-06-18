using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace ex3.Models
{
    public class Users
    {
        public int Id { get; set; }
        public int Wins { get; set; }
        public int Loses { get; set; }
        public DateTime SigningDate { get; set; }
        [Required]
        public string UserName;
        [Required]
        public string EncryptedPassword;
    }
}