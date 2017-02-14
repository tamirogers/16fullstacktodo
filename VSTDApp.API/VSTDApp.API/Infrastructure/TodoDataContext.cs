using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using VSTDApp.API.Models;

namespace VSTDApp.API.Infrastructure
{
    public class TodoDataContext : DbContext
    {
        public TodoDataContext() : base("TodoList")
        {

        }

        public IDbSet<Todo>Todoes { get; set; }
    }
}