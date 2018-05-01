@extends('layouts.app')

@section('title', 'Profile')

@section('content')

<form method="POST" action="{{ route('imageUpload') }}" enctype="multipart/form-data">
   {{ csrf_field() }}
    <input type="file" name="image">
    <button type="submit" class="btn btn-success">Upload Image</button>
</form>

@endsection
