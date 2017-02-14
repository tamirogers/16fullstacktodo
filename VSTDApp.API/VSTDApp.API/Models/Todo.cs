using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Web;

namespace VSTDApp.API.Models
{
    public class Todo
    {
        //get key 
        [Key]
        public int ToDoEntryId { get; set; }
        //adding columns
        public string AddTask { get; set; }
        public string SelectedPriority { get; set; }
        public DateTime CreateDate { get; set; }
    }
}