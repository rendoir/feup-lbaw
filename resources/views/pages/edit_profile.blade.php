@extends('layouts.app')

@section('title', 'Edit Profile')

@section('content')
<div class="row">

    <!-- Main body container -->
    <section class="col-md-9 px-0 px-sm-3 mt-5">
        <div class="dropdown" id="update-back-pic">
            <button class="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true"
                aria-expanded="false">
                Update your background picture
            </button>
            <div class="dropdown-menu mt-2 mb-0 p-0" aria-labelledby="dropdownMenuButton">
                <div class="input-group">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile02">
                        <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text" id="">Upload</span>
                    </div>
                </div>
            </div>
        </div>
        <img class="card-img-top" height="350px" src="assets/img/bg-profile.jpg" alt="Card image cap">

        <div class="card-body text-center pb-3">
            <div>
                <img class="rounded-circle img-profile-big" src="assets/img/img-profile.jpg" alt="UserImage">
            </div>

            <!-- Edit profile picture button -->
            <button class="btn bg-white btn-outline-success py-2 px-3 edit-main-pic" type="button" id="dropdownMenuButton" data-toggle="dropdown"
                aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-pencil-alt edit-pic-icon"></i>
            </button>
            <div class="dropdown-menu mt-1 mb-0 p-0 b-0 edit-profile-menu" aria-labelledby="dropdownMenuButton">
                <div class="input-group m-auto">
                    <div class="custom-file">
                        <input type="file" class="custom-file-input" id="inputGroupFile02">
                        <label class="custom-file-label" for="inputGroupFile02">Choose file</label>
                    </div>
                    <div class="input-group-append">
                        <span class="input-group-text" id="">Upload</span>
                    </div>
                </div>
            </div>

            <div class="input-group my-4">
                <div class="input-group-prepend">
                    <span class="input-group-text" id="">Username</span>
                </div>
                <input type="text" class="form-control profile-name" value="António Almeida">
            </div>
            <div class="input-group">
                <textarea class="form-control profile-textarea" aria-label="With textarea">Morbi mollis, eros eget sodales tempor, augue mi aliquet nisi, tempor placerat augue arcu sed odio. Aliquam orci urna, portavel quam quis, aliquam faucibus ante. Curabitur eleifend ut orci sit amet blandit. Curabitur placeratnte tortor, ac volutpat nulla tempus vitae. Donec scelerisque ipsum eu tempus congue. Vestibulum variusest sapien, in gravida tortor euismod eget.</textarea>
            </div>
        </div>

        <div class="text-center mt-3 mb-5">
            <a href="own-profile.html" role="button" class="btn btn-primary">
                <span class="pr-1">
                    <i class="far fa-save"></i>
                </span>
                Save Changes
            </a>
        </div>
    </section>

    <!-- Side Column -->
    <aside class="col-md-3">
        <div class="aside-content py-5">
            <div class="card">
                <div class="card-body text-center">
                    <h4 class="card-text my-2">Control Panel</h4>
                    <div class="d-flex flex-column justify-content-center">
                        <div>
                            <span class="badge badge-success mt-3 mb-2">Trusted</span>
                        </div>
                        <div>
                            <span class="badge badge-success mb-1">Moderator</span>
                        </div>
                    </div>
                    <div class="my-3">
                        <p>Reputation Points</p>
                        <i class="fas fa-trophy"></i>
                        <span>501</span>
                    </div>
                    <div class="d-flex flex-column align-content-center container">
                        <div class="py-2">
                            <i class="far fa-question-circle"></i>
                            <span>Questions: 12</span>
                        </div>
                        <div class="py-2 border-top">
                            <i class="far fa-hand-peace"></i>
                            <span>Answers: 21</span>
                        </div>
                        <div class="pt-2 pb-3 border-top">
                            <i class="far fa-comment"></i>
                            <span>Comments: 42</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </aside>

</div>


{{ csrf_field() }}
<img class="profile_img" width="256" height="256">
<label class="btn">Select Image<input type="file" name="image" hidden></label>
<button id="save_changes" class="btn btn-success">Save Changes</button>

@endsection
