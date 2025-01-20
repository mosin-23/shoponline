const express=require('express')
const query=require('../modal/QueryModal')

const createQuery=async(req,res)=>{
    try {
        const newquery=await query.create(req.body);
        res.status(200).json(newquery)
    } catch (error) {
        res.status(500).json({message:error})
    }
}
const getQuery=async(req,res)=>{
    try {
        const newquery=await query.find();
        res.status(200).json(newquery);
    } catch (error) {
        res.status(500).json({message:error})
    }
}
module.exports={
    createQuery,
    getQuery
};