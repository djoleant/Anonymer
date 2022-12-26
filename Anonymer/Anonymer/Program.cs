var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddCors(options =>
{
    options.AddPolicy("CORS",
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:5500",
                                    "https://localhost:3000",
                                    "https://localhost:5500",
                                    "https://127.0.0.1:5500",
                                    "http://localhost:3000")
                                    .AllowAnyHeader()
                           .AllowAnyMethod()
                           .AllowCredentials();
                          //.AllowAnyOrigin();
                          // policy.AllowAnyOrigin();
                          // policy.AllowAnyHeader();
                      });
});

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();
app.UseCors("CORS");

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseAuthorization();

app.MapControllers();

app.Run();
