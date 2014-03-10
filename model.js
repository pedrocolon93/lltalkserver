module.exports =  {
    Model : function (model_name,model_dimension, model_sub_dimension,lid, file_location)
    {
        this.model_name=model_name;
        this.model_dimension=model_dimension;
        this.model_sub_dimension=model_sub_dimension;
        this.lid = lid;
        this.file_location = file_location;
    }
};